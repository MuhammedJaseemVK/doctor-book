const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server running'
    });
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})