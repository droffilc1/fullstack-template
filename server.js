const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
  uri = process.env.DB_STRING,
  dbName = 'sample_mflix',
  collection

async function main() {  
  try {
    // Connect to Mongodb cluster
    MongoClient.connect(uri)
      .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName)
        collection = db.collection('movies')      
    })
        
  } catch (e) {
    console.log(e);
  } 
}

main().catch(console.error)


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})