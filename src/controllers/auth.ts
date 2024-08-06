import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { IUser } from '../models/user';

// Register controller
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Congratulations! You are added.',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while registering the user.',
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed. User not found.',
      });
    }

    // Assuming the IUser interface has an authenticate method
    if (!user.authenticate(password)) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed. Email and password do not match.',
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.SECRETKEY as string, // Ensure SECRETKEY is defined in .env
      { expiresIn: '1h' } // Optional: Set token expiration time
    );

    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({
      status: 'success',
      message: 'Congratulations! You are logged in now.',
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        accessToken: token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during login.',
    });
  }
};