const mongoose = require("mongoose");

class Database {
    constructor(){
        this.connect();
    }
    connect() {
        mongoose.connect("your mongodb url goes here").then(() =>{
    console.log(`connection successful`);
}).catch((err)=>{
    console.log(`error no conn`);
})
    }
}


module.exports = new Database(); //this will just run the instance of our class db using which we have the constructor made, the first thing would be the constructor getting called.
