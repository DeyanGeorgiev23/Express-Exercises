const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, require: true },
    creationDate: { type: mongoose.SchemaTypes.Date, require: true, default: Date.now },
    images: [{ type: mongoose.SchemaTypes.ObjectId }]
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;