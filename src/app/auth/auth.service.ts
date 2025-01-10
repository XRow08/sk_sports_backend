import * as sgMail from '@sendgrid/mail';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async login(user: LoginDto) {
    const userJson = { email: user.email, password: user.password };
    const token = await this.jwtService.signAsync(userJson);
    const buffered = Buffer.from(token.split('.')[1], 'base64').toString();
    const payload = JSON.parse(buffered);
    const expiresIn = DateTime.fromMillis(payload.exp * 1000)
      .toUTC()
      .toISO();
    const userLogged = await this.userService.findByEmail(user.email);
    return { token, expiresIn, user: userLogged };
  }

  generateSecurityCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendPasswordResetEmail(email: string) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) throw new BadRequestException(`User not found`);
      const security_code = this.generateSecurityCode();
      await this.userService.updateById(user.id, { security_code });
      await this.userService.sendMail(
        email,
        'Recuperação de Senha',
        `<h1>Recuperação de Senha</h1>
        <p>Você solicitou a recuperação de sua senha.</p>
        <p>Seu código de segurança é: ${security_code}</p>`,
      );
      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new BadRequestException(error.message);
    }
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      const isValid = await this.userService.validatePassword(
        password,
        user.password,
      );
      if (!isValid) throw new Error();
      delete user.password;
      return user;
    } catch (error) {
      throw new ForbiddenException('E-mail e/ou senha estão inválidos');
    }
  }
}
