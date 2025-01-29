const jwt = require('jsonwebtoken')

const verifayiToken = (req,res,next)=>{
    let token;
    let authHeadr = req.headers.Authorization || req.headers.authorization

    // console.log(authHeadr,"authHeadr");
    
    if(authHeadr &&  authHeadr.startsWith("Bearer")){
        token = authHeadr.split(" ")[1];

        console.log(token,"token");
        
       if(!token){
         return res.status(404).json({message:"No token , authorization denied"})
       }
        try {
            const decode =  jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode

            console.log("The decoded user is :", req.user);

            next()
        } catch (error) {
            console.log(error);
            
            res.status(400).json({message:"Token is not Valid"})
        }
    }else{
        return res.status(404).json({message:"farhan"})  
    }
};

module.exports = verifayiToken;