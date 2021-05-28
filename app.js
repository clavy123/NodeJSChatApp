const express=require("express")
const app=express()
const http=require('http').createServer(app)
const io=require('socket.io')(http,{cors:{origin:"*"}})
const path=require('path')
const mongo=require("mongoose");
const parser=require('body-parser');
const sha1 = require('js-sha1');
require('dotenv').config()
mongo.connect(process.env.CONNECT, {useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
    console.log("connection Suucessfull")
})
const ChatSchema=new mongo.Schema({
    chat:{
        type: String,
        required: true,
       unique: false,
       lowercase: true,
    }
})
let ChatModel=mongo.model('Chat',ChatSchema)
middleware=[
    parser.urlencoded({extended:true})
]
app.use(express.static(path.join(__dirname,'public')))
app.get('/index.htm',function(req,res){
    res.sendFile(__dirname+"/"+"index.htm")
})
app.post('/chat',middleware,function(req,res){
    const chat=new ChatModel({
        chat:sha1(req.body.num1)
    })
    chat.save().then(()=>{
        console.log("saved successfull")
    }).catch(e=>{
        console.log(error)
    })
    res.end()
})
http.listen(process.env.PORT,()=>{
    console.log("server is running")
})
io.on('connection',socket=>{
    console.log("user connect"+" "+socket.id+" "+io.engine.clientsCount+" "+socket.rooms)
    socket.on('chat',message=>{
        socket.broadcast.emit('new-user',message)
    })
})
