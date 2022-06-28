const { sequelize, Notes } = require('./models');
const express = require('express');

const app = express();
app.use(express.json());
const port = 3333;

app.get('/', (req, res) => {
    res.send('<h1>ORM</h1>');
});

app.post('/notes', async (req, res) => {
    const { title, body } = req.body;

    try {
        const note = await Notes.create({ title, body });
        return res.json(note);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Notes.findAll();
        return res.json(notes);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'There was an error.' });
    }
});

app.get('/notes/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const note= await Notes.findOne({
            where: { uuid }
        });
        return res.json(note);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'There was an error.' });
    }
});

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    await sequelize.sync();
    console.log('Database synced.');
});
