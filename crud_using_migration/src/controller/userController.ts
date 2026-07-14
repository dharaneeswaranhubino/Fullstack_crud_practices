import { NextFunction, Request, Response } from "express";
import * as service from "../service/userService";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const user = await service.createUser({ name, email, password });
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (error) {
        // res.status(400).json({ message: "Can't add new user" });
        next(error);
    }
}

export const fetchAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await service.fetchAllUser();
        res.status(200).json({ message: "User data fetched successfully", data: user });
    } catch (error) {
        // res.status(400).json({ message: "Can't fetch user data" });
        next(error);
    }
}

export const fetchSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const user = await service.fetchSingleUser(id);
        res.status(200).json({ message: `User data fetched for this ID : ${id}`, data: user })
    } catch (error) {
        // res.status(400).json({ message: "can't find this user data" })
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { name, email, password } = req.body;
        const user = await service.updateUser(id, { name, email, password });
        res.status(200).json({ message: `User data updated successfully!`, data: user });
    } catch (error) {
        // res.status(400).json({ message: "Can't update this user data" })
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const user = await service.deletUeser(id);
        res.status(200).json({ message: `User data delete for this id:${id}` })
    } catch (error) {
        // res.status(400).json({ message: "Can't delete this user" });
        next(error);
    }
}