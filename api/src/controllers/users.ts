import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/User";
import UserServices from "../services/users";
import generateToken from "../utils/generateToken";

export const createUserController = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password, firstName, lastName, phone, country, city, address } =  req.body;

        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            country: country,
            city: city,
            address: address
        });

        const userEmail = await UserServices.findUserByEmail(email);
        if (!userEmail) {
            const user = await UserServices.createUser(newUser);
            res.json({status: "success", message: `Registration successful`})
        }
        res.json({message: `${req.body.email} is already registered`})
    } catch (error) {
        console.log(error);
    }
}

export const loginWithPasswordController = async (
    req: Request,
    res: Response
) => {
    try {
        const userData = await UserServices.findUserByEmail(req.body.email);
        if (!userData) {
            res.json({message: `No user with email ${req.body.email}`});
            return;
        }

        const passwordDB = userData.password;
        const plainPassword = req.body.password;

        const match = await bcrypt.compare(plainPassword, passwordDB);

        if (!match) {
            res.json({message: "Wrong password"});
            return;
        }

        res.json({id: userData._id, token: generateToken(userData._id), status: "success", message: `Login successful`});
    } catch (error) {
        console.log(error);
    }
}

export const displayUserInformationController =  async (
    req: Request,
    res: Response
) => {
    try {
        const userData = await UserServices.findUserById(req.params.id);
        if (!userData) {
            res.json({message: `No user with id ${req.params.id}`});
            return;
        }
        res.json(userData);
    } catch (error) {
        console.log(error);
    }
}

export const updateUserByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const updatedUser = await UserServices.updateUserInfoById(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        console.log(error);
    }
}