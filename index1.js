const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// const Sequelize  = require('sequelize');
// const sequelize = new Sequelize('postgres','postgres','root', {
//     host : 'localhost',
//     dial : 'postgres',
//     operatorsAliases : false
// })



const client = new Client({
    user: "postgres",
    host: "Local PG",
    database: "SalesTable",
    password: "root",
    port: 5432,
  });


client.connect();
const Query =  async (query) => {
return new Promise((resolve, reject) => {
  client
    .query(query)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});
};

const selectCustomerQuery = {
    text: "SELECT * FROM SalesMan WHERE id=$1",
    values: ["1"],
};


const selectCustomerQueryResult = await Query(selectCustomerQuery);
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!...')
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ..${PORT}`);
  console.log('Press Ctrl+C to quit.');
});