import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export function signToken({ userId }: { userId: mongoose.Types.ObjectId }) {
    return jwt.sign({
        id: userId,
    }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: process.env.JWT_EXPIRED_IN as string
    })
}