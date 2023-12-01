"use server"; 

import { revalidatePath } from 'next/cache';
import {User, Product} from './models'
import {connectToDB} from './utils'
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt'
import {signIn} from '../auth';

import { AuthError } from 'next-auth';


export const addUser = async(formData) => {
    // "use server"; // no need to write in every function
    const {username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB()
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            phone,
            address,
            isAdmin,
            isActive
        });

        await newUser.save();
        
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

    // after data submit it validate path and fetch data
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users")
}

export const updateUser = async(formData) => {
    // "use server"; // no need to write in every function
    const {id, username, email, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB();

        const updateField = { username, email, phone, address, isAdmin, isActive };

        Object.keys(updateField).forEach( key => {
            if(updateField[key] == "" || updateField[key] == undefined) {
                delete updateField[key]
            }
        });
        await User.findByIdAndUpdate(id, updateField);
        
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

    // after data submit it validate path and fetch data
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users")
}

export const addProduct = async(formData) => {
    // "use server"; // no need to write in every function
    const {title, cat, price, stock, color, size, desc } = Object.fromEntries(formData);

    try {
        connectToDB()

        const newProduct = new Product({
            title,
            cat,
            price,
            stock,
            color,
            size,
            desc
        });

        await newProduct.save();
        
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

    // after data submit it validate path and fetch data
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products")
}

export const updateProduct = async(formData) => {
    // "use server"; // no need to write in every function
    const {id, title, cat, price, stock, color, size, desc } = Object.fromEntries(formData);

    try {
        connectToDB();

        const updateField = { title, cat, price, stock, color, size, desc };

        Object.keys(updateField).forEach( key => {
                if(updateField[key] == "" || updateField[key] == undefined) {
                    delete updateField[key]
                }    
            }
        );
        
        await Product.findByIdAndUpdate(id, updateField);
        
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

    // after data submit it validate path and fetch data
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products")
}

export const deleteProduct = async(formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB()
        await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

    // after data submit it validate path and fetch data
    revalidatePath("/dashboard/products");
}

export const deleteUser = async(formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB()
        await User.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

    // after data submit it validate path and fetch data
    revalidatePath("/dashboard/users");
}

export const authenticate = async(formData) => {
    const {username, password} = Object.fromEntries(formData);
    try {
        await signIn("credentials", {username, password});
    } catch (error) {
        return 'Invalid credentials.';
    }

}