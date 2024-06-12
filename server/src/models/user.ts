import { Model, Schema, model } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { IUser, IUserMethods } from "@/interfaces/user";
import crypto from 'crypto'
import { DEFAULT_PASSWORD_TOKEN_EXPIRE_TIME } from "@/constants";

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  avatar: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'A password should have at least 6 characters'],
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetTokenExpire: {
    type: Date,
    select: false,
  },
  passwordChangeAt: {
    type: Date,
    select: false,
  },
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8);
  next();
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = new Date();
  next();
})

UserSchema.method('comparePasswords', async function (candidate: string, hash: string) {
  const isValidPassword: boolean = await bcrypt.compare(candidate, hash)
  return isValidPassword
});

UserSchema.method('createPasswordResetToken', function () {

  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetTokenExpire = new Date(Date.now() + DEFAULT_PASSWORD_TOKEN_EXPIRE_TIME)

  return resetToken
});


export const UserModel = model<IUser, UserModel>("User", UserSchema);

