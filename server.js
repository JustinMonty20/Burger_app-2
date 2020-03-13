const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql")

const app = express();

const PORT = process.env.PORT || 3005;
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'ba5@96Jm',
        database: 'eat_da_burger_db'
    });
};

connection.connect(function(err){
    if(err){
        console.error("error connecting: " + err.stack);
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/", (req,res)=> {

})

app.listen(PORT, ()=> {
    console.log(`${PORT} is listening`)
})