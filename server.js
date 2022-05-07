require('dotenv').config();
const mongoose = require('mongoose')
const app = require('./app')
const port = 3000;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(con=>{
    console.log(con.connections);
    console.log('Db connections successful!!!');
})

app.listen(process.env.PORT || port, () => {
    console.log('App was started')
})
