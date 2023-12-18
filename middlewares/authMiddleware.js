const jwt = require("jsonwebtoken");

module.exports = async (req,res,next)=>{
    try{
        const token =req.headers['authorization'].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(200).send({sucess:false,message:"Auth failed"});
            }
            else{
                req.body.userId=decode.id
                next();
            }
        })
    }
    catch(error){
        console.log(error);
        return res.status(401).send({sucess:false,message:"Auth failed"})
    }
}