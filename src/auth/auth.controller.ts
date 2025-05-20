import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  loginWithEmail(@Body() body: { email: string; password: string }) {
    return this.authService.loginWithEmail(body.email, body.password);
  }

  @Post('google')
  loginWithGoogle(
    @Body()
    body: {
      googleId: string;
      email: string;
      name: string;
      picture?: string;
    },
  ) {
    return this.authService.loginWithGoogle(
      body.googleId,
      body.email,
      body.name,
      body.picture,
    );
  }
}
