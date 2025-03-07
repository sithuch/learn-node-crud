const mongoose = require("mongoose");
const Role = require("../models/Role");
const { cache } = require("ejs");

exports.createRole = async (req, res) => {

    try{

        const name = req.body.name;
        const description = req.body.description;
        const role = req.body.role;
        const role_ = ["admin", "user", "guest"];
        
        // console.log(role.includes(role));

        if (!role_.includes(role)) {
          return res.status(400).json({status: 400, error: "Invalid role! Allowed values: admin, guest, user" });
        }
        // console.log(roles);
        const roles = new Role({ name, description, role });
        await roles.save();
        // Add success response
        res.status(201).json({
            status: 201,
            success: true,
            data: roles
        });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getRoles = async (req,res) => {
    try {
        
        console.log("Fetching roles");
        const roles = await Role.find();
        res.status(200).json([{
            status: 200,
            success: true,
            result: roles
        }]);
        // res.status(200).json(roles);
    }catch(error){
        res.status(500).json([{ status: 500,message: error.message }]);
    }
}

exports.getRole = async (req, res) => {
    try{

        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json([{status:400, error: "Invalid role ID format"}]);
        }
        const role = await Role.findById(id);

        if (!role) {
            return res.status(404).json({ status: 404, error: "Role not found" });
        }
        res.status(200).json([{
            status: 200,
            success: true,
            result: role
        }]);

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.updateRole = async (req, res) => {
    try{
        const id = req.params.id;
        const { name, description, role } = req.body;
        const role_ = ["admin", "user", "guest"];

        if (!role_.includes(role)) {
            return res.status(400).json({status: 400, error: "Invalid role! Allowed values: admin, guest, user" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(
                400,
                { status: 400, error: "Invalid role ID format" }
            );
        }

            const roles = await Role.findByIdAndUpdate(id, { name, description, role }, { new: true });
            
            if (!role_) {
                return res.status(404).json({ status: 404, error: "Role not found" });
            }

        return res.status(200).json([{
            status: 200,
            success: true,
            result: roles
        }]);
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }

    exports.deleteRole = async (req, res) => {
        try{
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json([{status:400, error: "Invalid role ID format"}]);
            }
            const role = await Role.findByIdAndDelete(id);
            if (!role) {
                return res.status(404).json({ status: 404, error: "Role not found" });
            }
            res.status(200).json([{
                status: 200,
                success: true,
                result: role
            }
            ]);
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }