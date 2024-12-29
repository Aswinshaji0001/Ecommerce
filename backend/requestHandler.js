import userSchema from "./models/user.model.js";
import companySchema from './models/company.model.js'
import productSchema from './models/product.model.js'
import userDSchema from './models/userdetails.model.js'
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const { sign } = pkg;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aswinshaji0001@gmail.com",
    pass: "qauv folf fqwa lajb",
  },
});

export async function signUp(req, res) {
  try {
    const { email, username, password, cpassword, accounttype } = req.body;
    console.log(req.body);
    if (!(email && username && password && cpassword &&accounttype))
      return res.status(404).send({ msg: "Fields are empty" });
    if (password != cpassword)
      return res.status(404).send({ msg: "Password mismatching" });
    bcrypt.hash(password, 10).then((hashedPassword) => {
      console.log(hashedPassword);
      userSchema
        .create({ email, username, password: hashedPassword,accounttype})
        .then(async () => {
          console.log("Success");
          return res.status(201).send({ msg: "Suceess" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(404).send({ msg: "Not registered" });
        });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    console.log(user);
    if (!(email && password))
      return res.status(404).send({ msg: "Fields are empty" });
    if (user === null) return res.status(404).send({ msg: "User not found" });
    const success = await bcrypt.compare(password, user.password);
    console.log(success);
    if (success != true)
      return res.status(404).send({ msg: "Email or Password mismatch" });
    const token = await sign({ userId: user._id }, process.env.JWT_KEY,{expiresIn: "24h"});
    console.log(token);
    return res.status(201).send({ msg: "successfully logged in",token});
  } catch (error) {
    return res.status(404).send({ msg: "Error" });
  }
}
export async function verifyMail(req, res) {
  try {
    const { email } = req.body;
    console.log(req.body);
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: `${email}`, // list of receivers
      subject: "OTP", // Subject line
      text: "your otp", // plain text body
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                font-size: 24px;
                color: #333333;
              }
              p {
                font-size: 16px;
                color: #555555;
              }
              .button {
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                font-size: 18px;
                border-radius: 4px;
                margin-top: 20px;
                text-transform: uppercase;
              }
            </style>verifyMail
            </head>
            <body>
            <div class="container">
              <h1>Email Verification</h1>
              <p>Click the button below to verify your email address:</p>
              
              <a href="http://localhost:5173/signup" class="button">Verify Email</a>
            </div>
            </body>
            </html>
  `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    return res
      .status(201)
      .send({ msg: "confirmation mail set success", email });
  } catch (error) {
    return res.status(404).send({ msg: "error" });
  }
}

export async function Home(req,res) {
  try{
    console.log(req.user.userId);
      const _id = req.user.userId;
      const user = await userSchema.findOne({_id})
      if(!(user))
        return res.status(404).send({msg:"Unauthorized user"})
      return res.status(200).send({username:user.username,accounttype:user.accounttype})
  }
  catch(error){
    return res.status(404).send({msg:"error"})
  }
}

export async function Seller(req,res) {
  try{
    const _id=req.user.userId;
    const seller = await companySchema.findOne({sellerId:_id});
    console.log(seller);
    const user =await userSchema.findOne({_id});
    return res.status(201).send({seller,username:user.username,accounttype:user.accounttype,_id})
  }
  catch{
    res.status(404).send({msg:error})

  }
  
}
export async function editSeller(req,res) {
  try{
    console.log(req.body);
    const {...seller}=req.body;
    const _id =req.user.userId;
    const sellerd = await companySchema.findOne({sellerId:_id});
    console.log(sellerd);
    
    if(sellerd){
      const data=await companySchema.updateOne({sellerId:_id},{$set:{...seller}});

    }
    else{
      const data = await companySchema.create({...seller,sellerId:_id})
    }
    return res.status(201).send({msg:"Edited Success"})        
}catch(error){
    res.status(404).send({msg:error})
}
}

export async function getSeller(req,res) {
  try{
      const _id =req.user.userId;
    const seller = await companySchema.findOne({sellerId:_id});
     res.status(201).send(seller)
  }
  catch(error){
    res.status(404).send({msg:error})

  }
  
}

export async function addProduct(req,res) {
  try {
    const {...product} = req.body;
    console.log(req.body);
    const data = await productSchema.create({...product})
    res.status(201).send({msg:"Sucess"})
  } catch (error) {
    res.status(404).send({msg:error})

  }
 
}

export async function addUser(req,res) {
  try {
    const {...user} = req.body;
    console.log(user);
    const data = await userDSchema.create({...user})
    return res.status(201).send({msg:"Success"})
    
  } catch (error) {
    res.status(404).send({msg:error})

  }
  
}

export async function  getUser(req,res) {
  try {
        const _id = req.user.userId;
        const user = await userDSchema.findOne({userId:_id});
        console.log(user);
        return res.status(201).send({msg:"Success",user})

  } catch (error) {
    res.status(404).send({msg:error})

  }
  
}