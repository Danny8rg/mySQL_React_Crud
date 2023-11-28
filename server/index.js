const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sena1234",
    database:"empleadosCrud"
});

app.post("/create", (req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('insert into empleados(nombre,edad,pais,cargo,anios) values (?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("registro de empleado exitoso")
        }
    }
    )
});

app.get("/empleados", (req,res)=>{
    db.query('select * from empleados',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
});

app.put("/update", (req,res)=>{
    const id = req.body.id
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? Where id=?',[nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
});

app.put("/delete/:id", (req,res)=>{
    const id = req.params.id
    

    db.query('DELETE FROM empleados WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
});


app.listen(3001,()=>{
    console.log("app listen on port 3001")
})

module.exports = app