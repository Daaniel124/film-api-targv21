require("dotenv").config()
const app = require("express")()
//const mysql = require("mysql")
const mariadb = require("mariadb")
const port = process.env.APP_PORT

/*const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE
})*/

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    connectionLimit: 5
})
/*connection.connect(function(err){
    if(err) throw err
    connection.query("SELECT * FROM customers", 
    function(err, result, fields){
        if(err) throw err
        console.log(result)
    })
})*/

app.get("/customers", async (req,res)=>{
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

app.listen(port,()=>{
    console.log(`API up at: http://localhost:${port}`)
})