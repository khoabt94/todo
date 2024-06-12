import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    avatar: string;
    password: string;
    passwordResetToken?: string;
    passwordResetTokenExpire?: Date
    passwordChangeAt?: Date
}

export interface IUserMethods {
    comparePasswords: (_v: string, _h: string) => Promise<boolean>
    createPasswordResetToken: () => string;
}