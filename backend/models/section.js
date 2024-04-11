const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true
  },
  sdpOffer: {
    type: Object,
    required: true
  },
  sdpAnswer:{
    type:Object,
    required:false
  }
})

module.exports = mongoose.model('Section', SectionSchema)