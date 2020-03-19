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

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-04.cleardb.net',
    port: 3306,
    user: 'bc030990dbe712',
    password: 'b20610e2',
    database: 'heroku_0417969de3d3b02'
    }); 


pool.getConnection(function(err, connection){
    if(err){
        console.error("error connecting: " + err.stack);
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/", (req,res)=> {
    connection.query("SELECT * FROM burgers", (err, data)=> {
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
          return res.sendStatus(500)
      } 
      res.sendStatus(200)
  })


app.put("/api/burger/:id", (req,res)=>{
    // console.log("Route is being hit!!!!!")
    connection.query("UPDATE burgers SET devoured = true WHERE ID = ?", [req.params.id], (err,results)=>{ 
        console.log(results)
        if(err) {
            console.log(err)
            return res.sendStatus(500).end()
         } 
         else if (!results.changedRows) {
            console.log("nothing is being changed")
         }
         res.sendStatus(200).end();
     })
 })


})
app.listen(PORT, ()=> {
    console.log(`${PORT} is listening`)
})