const express = require("express");

const app = express();

app.use(express.json());

let empresas = [
    {id:1, name: "Facebook", site: "http://facebook.com"},
    {id:2, name: "Google", site: "http://google.com"},
    {id:3, name: "Hostgator", site: "http://hostgator.com"},
]

//Listagem

app.get("/empresas/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const empresa = empresas.find(items => items.id === id);
    const status = empresa ? 200:404;
    return res.status(status).json(empresa); 
});

//Inserção

app.post("empresas", (req,res)=> {
    const {name,site} = req.body;
    const id = empresas[empresas.length - 1].id + 1;

    const newEmpresa = {id,name,site};
    empresas.push(newEmpresa);
    
    return res.status(201).json(newEmpresa);
});

//atualização

app.put("/empresas/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const {name,site} = req.body;

    const index = empresas.findIndex(item => item.id === id);
    const status = index >= 0 ? 200:400;

    if(index >= 0){
        empresas[index] = {id: parseInt(id), name, site};
    }

    return res.status(status).json(empresas[index]);
})

//exclusão 

app.delete("/empresas/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const index = empresas.findIndex(item => item.id === id);
    const status = index >= 0 ? 200:404;

    if(index >= 0){
        empresas.splice(index,1);
    }

    return res.status(status).json();
})

app.listen(3000);