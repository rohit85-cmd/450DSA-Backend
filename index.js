
import cors from "cors"
import mongoose from "mongoose"
import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'DSADb',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to yourDB-name database'));

//Routes
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({email: email},(err,user)=>{
        if(user){
            // res.send({message:"User already registered"})
            if(password===user.password){
                res.send({message:"Login successful",user:user})
            }
            else{
                res.send({message:"Password didn't match"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    })
})

app.post("/register", (req, res) => {
    // res.send("My API register")
    const { name, email, password } = req.body
    User.findOne({email: email},(err,user)=>{
        if(user){
            res.send({message:"User already registered"})
        }
    })
    const user = new User({
        name,
        email,
        password
    })
    user.save(err => {
        if (err) {
            res.send(err)
        }
        else {
            res.send({ message: "Successfully Registered" })
        }
    })
})

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)



app.listen(4000, () => {
    console.log("Be started at port 4000")
})