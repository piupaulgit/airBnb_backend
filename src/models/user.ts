import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// Define an interface for the user document
export interface IUser extends Document {
  _password: string;
  authenticate: (plainPassword: string) => boolean;
  name: string;
  email: string;
  encry_password: string;
  role: number;
  salt: string;
  securePassword: (plainPassword: string) => string;
}

// Define the schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  encry_password: { type: String, required: true },
  role: { type: Number, required: true, default: 0 },
  salt: { type: String, required: true }
});

// Virtual field for password
UserSchema.virtual('password')
  .set(function (this: IUser, password: string) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
    console.log(this.encry_password,'pp')
  })
  .get(function (this: IUser) {
    return this._password;
  });

// Method to encrypt the password
UserSchema.methods.securePassword = function (this: IUser, plainPassword: string): string {
  if (!plainPassword) return '';
  try {
    console.log(plainPassword,this.salt, 'zsfgsdjhbjhbjhjhbgplain', this)
    return crypto.createHmac('sha256', this.salt).update(plainPassword).digest('hex')
    
  } catch (err) {
    return '';
  }
};

// Create the model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;