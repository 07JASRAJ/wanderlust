//require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const data = require("./data");

async function main() {
    try {
        await mongoose.connect(process.env.ATLASDB_URL);
        console.log("Connection Successful");
    } catch(error) {
        console.log(error);
    }
}
main();

async function initDB() {
    try {
        await Listing.deleteMany({});
        data.data = data.data.map((obj) => ({ ...obj, owner: '6992f0921c1136f945dcd993' }));
        await Listing.insertMany(data.data);
        console.log("Data Inserted Successfully");
    } catch(error) {
        console.log(error);
    }
}
initDB();


