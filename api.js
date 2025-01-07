const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 4001;
app.use(express.json());
const loadUsers = () => {
    const dataBuffer = fs.readFileSync('data.json');
    return JSON.parse(dataBuffer);
};
app.get('/users', (req, res) => {
    const users = loadUsers();
    res.json(users);
});
app.post('/users', (req, res) => {
    const users = loadUsers();
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});