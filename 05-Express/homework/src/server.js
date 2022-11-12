// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post('/posts',(req,res,next)=>{
    let {author,title,contents}= req.body

    if(!author || !title || !contents){
      return  res.status(STATUS_USER_ERROR).json({error:"No se recibieron los parámetros necesarios para crear el Post"})
    }
    let newObj={
        id: posts.length +1,
        ...req.body
    }
    posts.push(newObj)
    res.json(newObj)
})
server.post('/posts/author/:author',(req,res)=>{
    let {title,contents}= req.body
    let {author} = req.params
    if(!author || !title || !contents){
        return  res.status(STATUS_USER_ERROR).json({error:"No se recibieron los parámetros necesarios para crear el Post"})
      }
    let newObj={
        id: posts.length +1,
        ...req.params,
        ...req.body
    }
    posts.push(newObj)
    res.json(newObj)
})
server.get('/posts',(req,res)=>{
   let {term} = req.query
   if(!term){
    return res.json(posts)
   }
   let filterPost= posts.filter(p=>p.title.includes(term) || p.contents.includes(term))
   res.json(filterPost)
})

server.get('/posts/:author',(req,res)=>{
    let {author} = req.params
    let filterPost= posts.filter(p=>p.author===author)
    if(!filterPost.length){
        res.status(STATUS_USER_ERROR).json({error:"No existe ningun post del autor indicado"})
    }else{
        res.json(filterPost)
    }
})
server.get('/posts/:author/:title',(req,res)=>{
    let { author,title} = req.params
    let filterPost= posts.filter(p=>p.author===author && p.title===title)
    if(!filterPost.length){
        res.status(STATUS_USER_ERROR).json({error:"No existe ningun post con dicho titulo y autor indicado"})
    }else{
        res.json(filterPost)
    }
})
 server.put('/posts',(req,res)=>{
    let {id,title,contents} = req.body

    if(!id || !title || !contents){
       return res.status(STATUS_USER_ERROR).json({error:"No se recibieron los parámetros necesarios para modificar el Post"})
    }
    let idpost =  posts.find(p=>p.id ===id)
    if(!idpost){
        return res.status(STATUS_USER_ERROR).json({error:"Id invalida, por favor ingrese otro diferente"})
    }else{
        idpost.title = title
        idpost.contents = contents 
        res.json(idpost)
    }
 })
server.delete('/posts',(req,res)=>{
    let {id} = req.body
    if(!id){
        return res.status(STATUS_USER_ERROR).json({error:"No se recibio un ID"})
    }
    let idpost =  posts.find(p=>p.id ===id)
    if(!idpost){
        return res.status(STATUS_USER_ERROR).json({error:"El Id es invalido"})}
        posts=posts.filter(p=>p.id !== id)
        res.json({success:true})
})
server.delete('/author',(req,res)=>{
    let {author} = req.body
    if(!author) return res.status(STATUS_USER_ERROR).json({error:"No se recibio un autor"})
        let deletedpost = posts.filter(p=>p.author ===author)
        if(!deletedpost.length) return res.status(STATUS_USER_ERROR).json({error:"No existe el autor indicado"})
        posts=posts.filter(p=>p.author !== author)
        res.json(deletedpost)
})



module.exports = { posts, server };

