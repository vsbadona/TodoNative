import User from "../Model/userSchema.js"

export const registerUser = async (req, res) => {
    const { email, password, name,  mobile } = req.body
    if (!email || !password || !name || !mobile) {
        res.json({ alert: "All fields are required" })
    } else {
        const findAny = await User.findOne({ $or: [{ email: email }, { mobile: mobile }] })
        if (findAny) {
            res.json({ alert: "Email or Mobile number already registerd" })
        } else {
            const newUser = await new User({
                name, email, password, mobile
            })
            await newUser.save()
            if (newUser) {
                res.json({ success: "New user registered successfully", user: newUser })
            } else {
                res.json({ error: "Can't Register User" })
            }
        }
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.json({ alert: "All fields are required" })
    } else {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
            const checkPassword = await findUser.password == password
           if(checkPassword){
            res.json({success : "Login success"})
           }else{
            res.json({alert : "Invalid! password"})
           }
        } else {
            res.json({ alert: "Invalid! email" })
        }
    }
}

export const forgotPassword = async(req,res) => {
    const {email,mobile} = req.body
    const findUser = await User.findOne({ $or: [{ email: email }, { mobile: mobile }] })
// if(!findUser || findUser.mobile !== mobile){
//     res.json({alert : "Invalid email address or security question answer."})
// }else{
    
// }
res.json(findUser)
}

export const updateProfile = async(req,res) => {
    const {_id,name,image,mobile} = req.body
    if(!_id){
        res.json({alert : "Please login to contiue"})
    }else{
        if(!name && !image && !mobile){
            res.json({alert : "Please add something to update"})
        }else{
         const findUser = await User.findById(_id)
     if(findUser){
        findUser.name = name
         findUser.image = image
       findUser.mobile = mobile
            findUser.save()
        res.json({success : "Profile updated" , user:findUser})
        }else{
        res.json({error : "Can't update profile"})
     }
     }
        }
    }

    export const deleteUser = async(req,res) => {
        const {_id} = req.body
        const user = await User.findByIdAndDelete(_id)
        if(user){
            res.json({success : "User deleted"})
        }else{
            res.json({alert : "User not found"})
        }
    }

export const addTodo = async(req,res) => {
    const {name,id} = req.body
   if(!name || !id) {
    res.json({alert : "please enter all fields"})
   }else{
    const findUser = await User.findById(id)
    const data = {
        name : name
    }
    if (findUser) {
        findUser.todo = await findUser.todo.concat(data)
        await findUser.save()
        res.json(findUser)
    }
    else {
        res.json({ error: "Can't Add Todo" })
    }
   }
}

export const removeTodo = async(req,res) => {
    const {_id,id} = req.body
    const findUser = await User.findById(id)
    if (findUser) {
        const todo = await findUser.todo.filter(item => item._id != _id)
        findUser.todo = todo
        const save = await findUser.save()
        if (save) {
            res.json(todo)
        } else {
            res.json({ error: "Can't remove todo" })
        }
    } else {
        res.json({ alert: "User Not Found" })
    }
}