import { Controller, Get, Post } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
    @Post('login')
    create(): string {
        return 'this api will login';
    }
}