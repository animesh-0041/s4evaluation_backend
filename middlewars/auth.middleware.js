const express=require("express")
const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token);

    if(token){
        try {
            jwt.verify(token, 'masai', (err, decoded)=> {
                if(decoded){
                    req.body.author=decoded.author;
                    req.body.authorID=decoded.authorID
                    next()
                }else{
                    res.status(400).send(err.message)
                }
              });
            
        } catch (error) {
            res.status(400).send({"msg":"Please login!"})
        }

    }else{
        res.status(400).send({"msg":"Please login!"})
    }


}


module.exports={
    auth
}