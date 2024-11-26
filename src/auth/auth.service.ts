import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
        const { email, name, password } = signUpDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const user = new this.userModel({
            email,
            name,
            password: hashedPassword,
        });
        await user.save();

        return { message: 'User registered successfully' };
    }

    async signIn(signInDto: SignInDto): Promise<{ token: string }> {
        const { email, password } = signInDto;

        // Find the user
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate a mock token (replace with JWT for production)
        const token = `mock-token-for-${email}`;
        return { token };
    }
}
