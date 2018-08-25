const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    url: { type: mongoose.SchemaTypes.String, require: true } ,
    creationDate: { type: mongoose.SchemaTypes.Date, require: true, default: Date.now },
    description: { type: mongoose.SchemaTypes.String },
    tags: [{ type: mongoose.SchemaTypes.ObjectId }]
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;