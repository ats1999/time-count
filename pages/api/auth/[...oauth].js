import axios from "axios";
import createDev  from "@db/user/createUser";
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const { setCookie } = require('nookies');

const oAuth = async(req,res)=>{
  let token,userData,email;
  try{
    let tokenReq = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${req.query.oauth[1]}&redirect_uri=${process.env.REDIRECT_URI}`,{},{
      headers:{
        Accept:"application/json"
      }
    })

    token = tokenReq.data.access_token;
    // token may be undefined
    if(!token) return res.status(500).json({
      msg:tokenReq.data,
      uri:process.env.REDIRECT_URI
    });
  }catch(e){
    console.log(e);
    return res.status(500).send("Not Ok");
  }


  try{
    let data = await axios.get(`https://api.github.com/user`,{
        headers:{
          Authorization:`token ${token}`
        }
    });

    let emails = await axios.get(`https://api.github.com/user/emails`,{
      headers:{
        Authorization:`token ${token}`
      }
    }); 
    emails.data.forEach(thisEmail=>{
      if(thisEmail.primary == true) email=thisEmail.email;
    });
    userData = {
      fname:data.data.name || "Dev",
      password:" ",
      lname:" ",email,
      pic:data.data.avatar_url,bio:data.data.bio,
      status:data.data.company,token:token,
      socialMedia:{
        github:`https://github.com/${data.data.login}`,
        twitter:data.data.twitter_username,
        website:data.data.blog
      }
    };
  }catch(e){
    console.log(e);
    return res.status(500).send("Ok");
  }

  // save this user in the database
  try{
    const dev = await createDev(userData);
    
    const tokenDev = {
      fname:dev.fname,
      lname:dev.lname,
      id:dev._id,
      permissions:dev.permissions,
      pic:dev.pic
    }
    jwt.sign(tokenDev,JWT_KEY,{expiresIn:"10d"},(err,token)=>{
      if(err){
          console.log(err)
          res.status(500).send("Try again!")
      }
      setCookie({res},"ts",token,{
          maxAge:10 * 24 * 60 * 60,
          httpOnly:true,
          path:"/",
          secure:process.env.NODE_ENV == "production"
      });
      res.status(200).send(tokenDev)
    })
  }catch(e){
    return res.status(500).send("Did't saved");
  }
}
export default oAuth;