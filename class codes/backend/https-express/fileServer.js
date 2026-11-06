import fs from 'node:fs'
import express from "express"
import path from 'node:path'


const app = express()

app.get('/files', (req, res) => {
    fs.readdir(path.join(import.meta.dirname, 'files'), (error, names) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        res.json(names);
    });
});


app.get('/files/:filename', (req,res) => {

    const file = req.params.filename

    fs.readdir(path.join(import.meta.dirname, 'files'), (error,names) => {
        if(!names.includes(file)){
            return res.status(404).json({error: "NO SUCH FILE EXISTS"})
        }

    fs.readFile(path.join(import.meta.dirname,'files',file), 'utf-8', (err,data) => {
        if(err){
            return res.status(500).json({error: 'Failed to read file'})
        }
        res.status(200).send(data)
    })
    })
   
})


app.use((req,res)=>{
    res.status(404).json({error:'Route doesnt match'})
})


app.listen('3000', () => {
    console.log('App listening on http://localhost:3000')
})