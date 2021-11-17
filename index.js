const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {Client} = require('pg');
// const data = require('./database')
var cors = require('cors');
app.use(cors());
// var bodyParser = require('body-parser');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    const client  = new Client({
        host: "localhost",
        port : 5432,
        user : "postgres",
        password: "root",
        database: "salesdb"
    })
    await client.connect();
    client.query(`select * from salestable`,async (err,result)=>{
        if (!err){console.log('result',result);}
        const structuredData = await JSON.stringify(result.rows) 
        res.status(200).send(structuredData) 
        client.end();
    })      
});


app.post('/getbyWeek', async(req,res)=> {
    console.log('/getbyWeek rout hit');
    const from = req.body.from
    const to = req.body.to
    console.log('from',from,'to',to);
    const client  = new Client({
        host: "localhost",
        port : 5432,
        user : "postgres",
        password: "root",
        database: "salesdb"
    })
    await client.connect();
    const query = `SELECT * FROM public.salestable WHERE date >= '${from}' AND date < '${to}'`;
    console.log('query',query); 
        client.query(`${query}`,async (err,result)=>{
        if (!err){console.log('result',result);}
        const structuredData = await JSON.stringify(result.rows) 
        res.status(200).send(structuredData) 
        client.end();
    })      
    console.log(req.body); 
})

  






// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ..${PORT}`);
  console.log('Press Ctrl+C to quit.');
});