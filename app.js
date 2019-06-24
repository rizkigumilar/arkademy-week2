require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT


const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

app.use(bodyParser.json()) // Body parse json
app.use(bodyParser.urlencoded({ extended: false })) // body type

// port declaration
app.listen(port, () => {
    console.log("cihuyyy....")
})

// Place your endpoint below

// GET data
app.get('/',(req, res) => {
  const data = 'SELECT * FROM books'
  conn.query(data, (err, result) => {
    if(err) console.log(err)
    res.json(result)
  })
})

// GET data by location
app.get('/location/:location', (req, res) => {
  const location = req.params.location
  const data = 'SELECT * FROM books WHERE location = ?'
  conn.query(data, location, (err, result) => {
    if(err) console.log(err)
    res.json(result)
  }) 
})

// GET data by category
app.get('/category/:category', (req, res) => {
  const category = req.params.category
  const data = 'SELECT * FROM books WHERE category = ?'
  conn.query(data, category,(err,result) =>{
    if(err) console.log(err + "\n data tidak ditemukan.")
    res.json(result)
  })
})




// POST data
app.post('/', (req, res) => {
  const data = {
    name: req.body.name,
    writer: req.body.writer,
    location: req.body.location,
    category: req.body.category
  }

  const insert = 'INSERT INTO books SET ?'

  conn.query(insert, data, (err, results) => {
    if (err) console.log(err)
    res.json(results)
  })
})

// PATCH
app.patch('/:book_id', (req, res) => {
  const book_id = req.params.book_id

  const data = {
    name: req.body.name,
    writer: req.body.writer,
    location: req.body.location,
    category: req.body.category
  }

  conn.query('UPDATE books SET ? WHERE book_id = ?', [data, book_id], (err, results) => {
    if (err) console.log(err)
    res.json(results)
  })

})

// DELETE
app.delete('/:book_id', (req, res) => {
  const book_id = req.params.book_id

  conn.query('DELETE FROM books WHERE book_id = ?', book_id, (err, results) => {
    if (err) console.log(err)
    res.json(results)
  })
})