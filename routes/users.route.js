const express = require("express");
const { UserModel } = require("../model/users.model");
const {auth}=require("../middlewars/auth.middleware")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const usersRoute = express.Router();

//register
usersRoute.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, name, gender, password: hash });
      await user.save();
      res.send({ msg: "Registration successful" });
    });
  } catch (error) {
    res.send(error);
  }
});

//login

usersRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    try {
        bcrypt.compare(password, user.password, (err, result)=> {
            if(result){
               const token= jwt.sign({ author: user.name,authorID:user._id }, "masai") 
                    res.send({"msg":"Login successfull","token":token})
                  
            }else{
                res.status(400).send({"msg":"Plesae enter correct password!"})
            }
        });


    } catch (error) {}
  }else{
    res.status(400).send({"msg":"Plesae enter correct email!"})
  }
});

usersRoute.use(auth)
usersRoute.get("/m",async(req,res)=>{
    res.send("data got")
})

module.exports = {
  usersRoute,
};
