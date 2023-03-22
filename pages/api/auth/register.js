import dbConnect from 'lib/mongodb';
import UserModel from 'models/Users';
import bcrypt from 'bcrypt';
export default async function handler(req, res){
    if(req.method=="POST"){
        await dbConnect()
        try {
            if(!req.body.email || !req.body.password || !req.body.name){
                return res.status(401).json({
                    success:false,
                    error:true,
                    msg:"Invalid Details"
                })
            }
            let name = req.body.name.trim()
            let email = req.body.email.trim().toLowerCase()
            let password = req.body.password.trim()
            let passdata = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
            let User = new UserModel({
                name:name,
                email:email,
                password:passdata
            })
            await User.save()
            return res.json({
                success:true,
                error:false,
                msg:"Registered Successfully"
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    return res.redirect('/404')

}