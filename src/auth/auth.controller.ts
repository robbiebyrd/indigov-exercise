import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
