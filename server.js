require('dotenv').config();
const mongoose = require('mongoose')
const app = require('./app')
const port = 3000;

let Db;
if (process.env.NODE_ENV==='development') {
    Db = process.env.DATABASE_DEV
} else Db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(Db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(con=>{
    console.log(con.connections);
    console.log('Db connections successful!!!');
})

app.listen(process.env.PORT || port, () => {
    console.log('App was started')
})
