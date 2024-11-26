import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}
