const express = require('express');
const Workspace = require('../models/Workspace');

const router = express.Router();

//add Workspace
router.post('/', async (req, res) => {
    try {
        const { userId, name, notes } = req.body;
        const workspace = new Workspace({ userId, name, notes });
        await workspace.save();
        res.json(workspace);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }

});

// Delete a Workspace
router.delete('/:workspaceId', async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const workspace = await Workspace.findByIdAndDelete(workspaceId);

        // not sure if this error is so necessary
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }

        res.json({ message: 'Workspace deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
});

//edit Note in a Workspace
router.patch('/:workspaceId/notes/:noteId', async (req, res) => {
    try {
        const { workspaceId, noteId } = req.params;
        const { text, color, shape, size, position, zIndex } = req.body;

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }
        const note = workspace.notes.id(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        

        // Update note properties if new values are provided
        if (text) note.text = text;
        if (color) note.color = color;
        if (shape) note.shape = shape;
        if (size) note.size = size;
        if (position) note.position = position;
        if (zIndex) note.zIndex = zIndex;

        await workspace.save();
        res.json(workspace);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
});

module.exports = router;
