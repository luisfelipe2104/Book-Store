import express from "express"
import mysql from "mysql"
import cors from "cors"

// creates an express app
const app = express()

// port variable
const PORT = 3333

// connects to the database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Library"
})

// allow us to send data to express
app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

// shows all the books
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// creates a book
app.post("/create-book", (req, res) => {
    const q = "INSERT INTO books(`title`, `descri`, `cover`, `price`) VALUES (?)"
    // const values = ["100% present", "another great book", "COVER"]
    const values = [
        req.body.title,
        req.body.descri,
        req.body.cover,
        req.body.price
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created!")
    })
})

app.delete("/delete/:id", (req, res) => {
  const bookId = req.params.id
  const q = "DELETE FROM books WHERE ID = ?;"

  db.query(q, [bookId], (err, data) => {
    if(err) return res.json(err)
    return res.json("Book has been deleted!")
  })
})

app.put("/update/:id", (req, res) => {
  const bookId = req.params.id
  const q = "UPDATE books SET `title` = ?, `descri` = ?, `price` = ?, `cover` = ? WHERE id = ?;"

  const values = [
    req.body.title,
    req.body.descri,
    req.body.price,
    req.body.cover,
  ]

  db.query(q, [...values, bookId], (err, data) => {
    if(err) return res.json(err)
    return res.json("Book has been updated!")
  })
})

// starts the server
app.listen(PORT, () => {
    console.log("Connected to the port: " + PORT)
})
