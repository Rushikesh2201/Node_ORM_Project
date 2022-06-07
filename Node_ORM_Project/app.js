
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const userData = require('./controllers/user_data');
require ('./models');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req,res)=> {
    res.send("home page")
})
;
//***curd operations***//
app.get("/add", userData.addUser);
app.get("/update",userData.update);
app.get("/remove",userData.remove);
app.get("/users",userData.allUsers);

//***for association***//
//one to one
app.get("/one-one", userData.oneToOne);
app.get('/belongsTo', userData.belongsTo);

//one to many
app.get('/one-many',userData.oneToMany);

//many to many
app.get('/many-many', userData.manyToMany);

//polymorphic one-many
app.get('/poly_one-many', userData.polyOneToMany);

//polymorphic many to many
app.get("/poly_many-many", userData.polyManyToMany);

const port = 8080
app.listen(port, () =>{console.log(`Running at http://localhost:${port}`);})