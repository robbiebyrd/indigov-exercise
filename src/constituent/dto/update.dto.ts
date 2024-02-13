import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional, IsPostalCode, IsString,} from 'class-validator';

export class UpdateConstituentDto {
    @IsNotEmpty({message: 'An email address is required.'})
    @IsEmail()
    @ApiProperty({description: 'The email address of the constituent. Required.',})
    email: string;

    @IsOptional()
    @IsNotEmpty({message: "The constituent's first name is required"})
    @IsString()
    @ApiProperty({description: 'The first name of the constituent.',})
    firstName?: string;

    @IsOptional()
    @IsNotEmpty({message: "The constituent's last name is required."})
    @IsString()
    @ApiProperty({description: 'The last name of the constituent.',})
    lastName?: string;

    @IsOptional()
    @IsNotEmpty({message: "The constituent's address is required."})
    @IsString()
    @ApiProperty({description: 'The address of the constituent.',})
    address?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({description: 'Any additional address data for the constituent.',})
    address2?: string;

    @IsOptional()
    @IsNotEmpty({message: "The constituent's city is required."})
    @IsString()
    @ApiProperty({description: 'The city of the constituent.',})
    city?: string;

    @IsOptional()
    @IsNotEmpty({message: "The constituent's state is required."})
    @IsString()
    @ApiProperty({description: 'The state of the constituent.',})
    state?: string;

    @IsOptional()
    @IsNotEmpty({message: "The constituent's postal code is required."})
    @IsPostalCode('US')
    @ApiProperty({description: 'The postal code of the constituent.',})
    zip?: string;
}
