const User = require("../models/User");
const mongoose = require("mongoose");
exports.getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getUser = async (req, res) => {
  try {
    // console.log('sds');
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  

exports.createUser = async (req, res) => {
    try {
        // const { name, email, age } = req.body;
        const name = req.body.name;
        const email = req.body.email;
        const age = req.body.age;
        
        const user = new User({ name, email, age });
        await user.save();
        res.status(201).json({
            status: 201,
            result: "insert user sucessfully."
          });
          
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const name = req.body.name;
        const email = req.body.email;
        const age = req.body.age;
        const created_at = Date.now();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await User.findByIdAndUpdate(id, { name, email, age, created_at}, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            status: 201, 
            message: "Updated successfully", 
            result: user});

    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            status: 201,
            message: "Deleted successfully",
            result: user});

        }catch(error) {
        res.status(400).json({ message: error.message });
    }
}
