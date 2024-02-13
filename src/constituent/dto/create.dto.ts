import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateConstituentDto {
    @IsNotEmpty({message: 'An email address is required.'})
    @IsEmail()
    @ApiProperty({description: 'The email address of the constituent. Required.',})
    email: string;

    @IsNotEmpty({message: "The constituent's first name is required."})
    @IsString()
    @ApiProperty({description: 'The first name of the constituent. Required.',})
    firstName: string;

    @IsNotEmpty({message: "The constituent's last name is required."})
    @IsString()
    @ApiProperty({description: 'The last name of the constituent. Required.',})
    lastName: string;

    @IsNotEmpty({message: "The constituent's last name is required."})
    @IsString()
    @ApiProperty({description: 'The address of the constituent. Required.',})
    address: string;

    @IsOptional()
    @IsString()
    @ApiProperty({description: 'Any additional address data for the constituent. Optional.',})
    address2?: string;

    @IsNotEmpty({message: "The constituent's city is required."})
    @IsString()
    @ApiProperty({description: 'The city of the constituent. Required.',})
    city: string;

    @IsNotEmpty({message: "The constituent's state is required."})
    @IsString()
    @ApiProperty({description: 'The state of the constituent. Required.',})
    state: string;

    @IsNotEmpty({message: "The constituent's postal code is required."})
    @IsString()
    @ApiProperty({description: 'The postal code of the constituent. Required.',})
    zip: string;
}
