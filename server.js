const express = require('express')
const app = express()
const cors = require('cors')
const { urlencoded } = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


// database
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

// Middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(cors)


app.get('/', async (req, res) => {
  try {
    res.render('index.ejs')
  } catch (error) {
    res.status(404).send({ message: error.message})
  }
  
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})