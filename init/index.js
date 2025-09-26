const mongoose = require("mongoose");
const Listing = require("../models/listing");
const data = require("./data");

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
        console.log("Connection Successful");
    } catch(error) {
        console.log(error);
    }
}
main();

async function initDB() {
    try {
        await Listing.deleteMany({});
        data.data = data.data.map((obj) => ({ ...obj, owner: '68cbe6a98dcd711cea1f37b6' }));
        await Listing.insertMany(data.data);
        console.log("Data Inserted Successfully");
    } catch(error) {
        console.log(error);
    }
}
initDB();
