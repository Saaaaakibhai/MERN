const express = require("express");
const mongoose = require('mongoose');

const app = express();

const port = 3002;
//create product schema
const productSchema= new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        price: Number,
        description: String,
        createdAt: {
            type: Date,
            default: Date.now,
    },
});
//create product model
const Product = mongoose.model("products", productSchema);

// async await issue 
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/testProductDB');
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
        console.log(error.message);
        process.exit(1);
    }   
}

// than catch issue
// mongoose.connect('mongodb://127.0.0.1:27017/testProductDB')
//     .then(() => console.log("db is connected"))
//     .catch((error) => {
//         console.log("DB is not connected");
//         console.log(Error404);
//         process.exit(1);
//     });

app.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`);
    await connectDB();
});

app.get("/", (req, res) => {
    res.send("welcome brother");
});
