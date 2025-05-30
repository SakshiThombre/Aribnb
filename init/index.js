const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
main()
    .then(()=>{
        console.log("connnected to db");
    })
    .catch((err)=>{
    console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await listing.deleteMany({});
    const allTypes = ["rooms", "mountains", "pools", "camping", "farming", "arctic"];
     initdata.data = initdata.data.map((obj, i) => ({
    ...obj,
    Owner: "6832b0ab6a9d5cefed345544",
    types: [allTypes[i % allTypes.length]] ,
    contact:1234567890,
    }));
       await listing.insertMany(initdata.data);
    console.log("data was initalized");
}
initDB();