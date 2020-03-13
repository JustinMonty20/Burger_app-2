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
    connection.query("SELECT * FROM burgers", (err,data)=> {
        if (err) {
            return res.sendStatus(500)
        }
        const eatenBurgers = data.filter(burger => burger.devoured === 1);
        const freshBurgers = data.filter(burger => burger.devoured === 0);

        res.render("index", {burgers: freshBurgers, eaten: eatenBurgers})
    })
})


app.post("/api/burger", (req,res)=> {
  connection.query("INSERT INTO burgers SET ?", {burger_name: req.body.name}, (err, data) => {
      if (err) {
          console.log(err)
          return res.status(500).end();
      } 
      res.sendStatus(200)
      console.log(req.body.burger)
  })


})
app.listen(PORT, ()=> {
    console.log(`${PORT} is listening`)
})