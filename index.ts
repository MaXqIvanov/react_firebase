import { Request, Response } from "express";

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req: Request, res: Response) => {
    res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(5005, () => {
    console.log('Application listening on port 5005!');
});