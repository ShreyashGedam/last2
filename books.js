const express = require("express")

const mongosse = require("mongoose")

const app = express()

app.use(express.json())

const bookschema = new mongosse.Schema({

    name : {type : String , required : true}
},
{
    versionKey : false,
    timestamps : true
})

const logger = async( req, res , next ) =>
{
    console.log("Middleware passed")
    next()
}

const Book = mongosse.model("books",bookschema)

app.get("/users",logger() , async (req, res) =>
{
    const user = await Book.find()

    return res.send(user)
})

app.post("/users/:name" , async(req , res) =>
{
    const user = await Book.find(req.params.name)
})

const connect = async() =>
{
    return mongosse.connect("mongodb://localhost:4500/lasttwo")

} 

app.listen(4500,async(req , res) =>
{
    console.log("listening to the server")

    await connect()
})