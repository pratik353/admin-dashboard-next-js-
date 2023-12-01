import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true, min:3, max:20},
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}, 
    phone: {type: String}, 
    img: {type: String}, 
    isAdmin: {type: Boolean, default: false}, 
    isActive: {type: Boolean, default: true}, 
    address: {type: String}, 
}, {timestamps: true}
);

const productSchema = new mongoose.Schema({
    title:{type: String, required: true, unique: true},
    cat: {type: String, required: true}, 
    price: {type: Number, required: true, min:0}, 
    img: {type: String}, 
    stock: {type: String, require: 1, min:0}, 
    color: {type: String}, 
    size: {type: String}, 
    desc: {type: String},
}, {timestamps: true}
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);