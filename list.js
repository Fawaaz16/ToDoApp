const mongoose = require('mongoose');
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.
//It manages relationships between data, provides schema validation, 
//and is used to translate between objects in code and the representation of those objects in MongoDB
const Schema = mongoose.Schema;

const listSchema = new Schema({
    body: {
        type : String,
        required: true
    }

}, {timestamps: true});

const List = mongoose.model('List', listSchema);
module.exports = List;
