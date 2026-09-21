const express = require('express');
const Notes = require('../models/notes');

const notes = express.Router();

notes.get('/', async (req, res) => {
    try {
        const userId = req.user.id;

        const userNotes = await Notes.findAll({
            where: {
                userId: userId
            }
        });

        res.json(userNotes);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

notes.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const deleted = await Notes.destroy({
            where: {
                id: id,
                userId: userId
            }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

notes.post('/',async(req,res)=>{
    try{
        const{text,category_id} = req.body;
        if(!text || !category_id){
            return res.status(400).json({message:'Test and category are required'});
        }
        const newNote = await Notes.create({
            text : text,
            userId : req.user.id,
            category_id : category_id
        });
        res.status(201).json({message :'Note created successfully', note : newNote});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

notes.patch('/:id',async(req,res)=>{
    try{
        const{text,category_id} = req.body;
        const id = req.params.id;
        const userId = req.user.id;
        const note = await Notes.findOne({
            where:{
                id : id,
                userId : userId
            }
        });
        if(!note){
            return res.status(404).json({message:'Note not found'});
        }
        await note.update({
            text : text,
            category_id : category_id
        });
        res.json({message: 'Note updated successfully', note : note});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = notes;