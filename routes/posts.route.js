const express = require("express");
const { PostModel } = require("../model/posts.model");
const {auth}=require("../middlewars/auth.middleware")
const postRoute = express.Router();

//posts create

postRoute.post("/",async(req,res)=>{
    try {
        const post=new PostModel(req.body)
            await post.save();
            res.send({"msg":"Your new post has been posted"})
        
    } catch (error) {
        res.send(error)
    }
})


// posts read

postRoute.get("/",async(req,res)=>{
    try {
        const posts=await PostModel.find({authorID:req.body.authorID})
        res.send(posts)
    } catch (error) {
        res.send(error)
    }
})



//update  patch

postRoute.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const post=await PostModel.findOne({_id:id})
        if(req.body.authorID==post.authorID){

            await PostModel.findByIdAndUpdate({_id:id},req.body);
            res.send(`${id} data updated`)
        }
else{
    res.send({"msg":"You are not authenticate!"})
}

    } catch (error) {

        res.send(error)
    }
    
   
})
//delete  
postRoute.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    const post=await PostModel.findOne({_id:id});
    try {
        if(req.body.authorID==post.authorID){
            await PostModel.findByIdAndDelete({_id:id})
            res.send(`${id} note deleted`)
        }else{
            res.send({"msg":"You are not authenticate!"})
     
        }
    
    } catch (error) {
        res.send(error)
    }
    })





module.exports={
    postRoute
}