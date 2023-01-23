require("dotenv").config()
const app = require("express")()
//const mysql = require("mysql")
const mariadb = require("mariadb")
const port = process.env.APP_PORT
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

require("./routers/app.routers.js")(app)

/*const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE
})*/

/*connection.connect(function(err){
    if(err) throw err
    connection.query("SELECT * FROM customers", 
    function(err, result, fields){
        if(err) throw err
        console.log(result)
    })
})*/

/*app.get("/customers", async (req,res)=>{
    let conn
    try {
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT id, CONCAT(firstname,' ',lastname) As name FROM customers")
        res.send(JSON.stringify(rows))
    } catch (error) {
        console.log(error)
    } finally{
        conn.end()
    }
})

app.get("/films", async(req,res)=>{
    let conn
    try {
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT id, title FROM films")
        res.send(JSON.stringify(rows))
    } catch (error) {
        console.log(error)
    } finally{
        conn.end()
    }
})

app.get("/tickets", async (req,res)=>{
    let conn
    try {
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT id, sessionID, CONCAT(firstName,' ',lastName) As name FROM tickets")
        res.send(JSON.stringify(rows))
    } catch (error) {
        console.log(error)
    } finally{
        conn.end()
    }
})*/

app.listen(port, async ()=>{
    await require("./db").Sync()
    console.log(`API up at: http://localhost:${port}`)
})