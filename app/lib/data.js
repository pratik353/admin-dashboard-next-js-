import { User, Product } from './models'
import {connectToDB} from './utils'

export const fetchUsers = async(q, page) =>{
    const regex = new RegExp(q, "i");

    const itemsPerPage = 2
    try {
        connectToDB();
        const count = await User.find({username:{$regex:regex}}).count();
        const users = await User.find({username:{$regex:regex}}).limit(itemsPerPage).skip(itemsPerPage * (page-1));
        return {users, count}
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const fetchUser = async(id) =>{
    try {
        connectToDB();
        const user = await User.findById(id);
        return user
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const fetchProducts = async(q, page) =>{
    const regex = new RegExp(q, "i");

    const itemsPerPage = 2
    try {
        connectToDB();
        const count = await Product.find({title:{$regex:regex}}).count();
        const products = await Product.find({title:{$regex:regex}}).limit(itemsPerPage).skip(itemsPerPage * (page-1));
        return {products, count}
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const fetchProduct = async(id) =>{
    try {
        connectToDB();
        const products = await Product.findById(id);
        return products
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}
