const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const Section = require('./models/section');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Vaishnavi:Vaishnavi%40Mongo@cluster0.a0db0r4.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
});

//sockets
const io = require('socket.io')(process.env.PORT || 4000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

Client1Sdp = null;
Answer = null;
io.on('connection', socket => {
    // socket.on('joined-section', (name) => {
    //     console.log("New User Joined Room!" + name);
    //     socket.broadcast.emit('NewUserJoined', `New client joined`);
    // });
    socket.on('OfferCreated',(obj)=>{
        console.log("client1 sdp received");
        Client1Sdp = obj;
        socket.broadcast.emit('ReceiveOffer',Client1Sdp );
    })
    socket.on('AnswerCreated',(answer)=>{
        console.log("answer created");
        this.Answer = answer;
        socket.broadcast.emit('ReceivedAnswer',this.Answer);
    });
    // socket.on('client2Joined',(name)=>{
    //     console.log(name+" joined");
    //     socket.broadcast.emit('getClient1Sdp',Client1Sdp );
    // });
    // socket.on('acceptsOffer',(Answer)=>{
    //     console.log("Offer Accepted joined");
    //     socket.broadcast.emit('getClient2Answer',Answer );
    // })
});

app.use(cors()); // Use cors middleware
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Hello intruder!');
});

app.post('/section', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }
        const { sectionId, sdpOffer, sdpAnswer } = req.body;
        const sectionData = new Section({ sectionId, sdpOffer, sdpAnswer });
        const resp = await sectionData.save();
        res.status(201).json(resp);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/sectionupdate', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }
        const { sectionId, sdpOffer } = req.body;
        console.log(req.body);
        const sectionData = await Section.findOneAndUpdate({ sectionId }, { sdpOffer }, { new: true });
        if (!sectionData) {
            return res.status(404).json({ message: "Section not found" });
        }
        res.status(200).json(sectionData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get('/section/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const Sectiondata = await Section.find({ sectionId: id }).populate();
        res.json(Sectiondata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
