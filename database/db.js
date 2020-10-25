const mongoose = require('mongoose');

function connectToDB(dbUrl){
    mongoose.connect(dbUrl, {useNewUrlParser:true});

    const connection = mongoose.connection;
    connection.on('error', ()=>{
        console.log('Error while connecting to db')
    })
}

module.exports ={
    connectToDB,
}