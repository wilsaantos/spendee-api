import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }

  async loginWithEmail(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.generateToken(user.id);
  }

  async loginWithGoogle(
    googleId: string,
    email: string,
    name: string,
    picture?: string,
  ) {
    let user = await this.userService.findByGoogleId(googleId);

    if (!user) {
      user = await this.userService.create({
        email,
        name,
        googleId,
        picture,
      });
    }

    return this.generateToken(user.id);
  }

  generateToken(userId: string) {
    const payload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
