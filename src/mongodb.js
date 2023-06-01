// const mongoose=require("mongoose")

// mongoose.connect("mongodb+srv://farazinfinity:AOixgzUmRF5NCSK0@cluster0.jzbucpp.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

// .then(()=>{
//     console.log("mongodb connected")
// })

// .catch(()=>{
//     console.log("mongodb not connected")
// })

// const LogInSchema=new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
        
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// const collection= new mongoose.model("LogInCollection",LogInSchema)
// module.exports=collection;