const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    text: String,
    color: String,
    shape: String,
    size: { type: Number, type: Number },
    position: { type: Number, type: Number },
    zIndex: Number,
});

const WorkspaceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    notes: [NoteSchema],
});

module.exports = mongoose.model('Workspace', WorkspaceSchema);