import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { ResetPassReqDto, ResetPassDto } from './dto/resetPassReqDto.dto';

@Injectable()
export class UserService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@lojasksports.store',
        pass: 'Bernardo0210*',
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
      authMethod: 'LOGIN',
    });
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return this.prisma.user.findMany({
      where: { deletedAt: null },
      skip: offset,
      take: limit,
      include: { address: true },
    });
  }

  async createNew(data: CreateUserDto) {
    try {
      data.password = await this.hashPassword(data.password);
      const user = await this.prisma.user.create({ data });
      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: { address: true },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: { email, deletedAt: null },
      include: { address: true },
    });
  }

  async updateById(id: string, data: Partial<UpdateUserDto>) {
    if (data.password) data.password = await this.hashPassword(data.password);
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
  }

  async sendMail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: '"lojasksports" <no-reply@lojasksports.store>',
      to,
      subject,
      html,
    });
  }

  async validateCode(payload: { email: string; code: string }) {
    try {
      const user = await this.findByEmail(payload.email);
      if (!user || user.security_code !== payload.code) {
        throw new BadRequestException('Código de segurança inválido');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async resetPassword(body: ResetPassDto) {
    const { email, newPassword } = body;
    try {
      const user = await this.findByEmail(email);
      const password = await this.hashPassword(newPassword);
      await this.prisma.user.update({
        data: { password, security_code: null },
        where: { id: user.id },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  async validatePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      console.log(e);
      throw new Error('Token inválido');
    }
  }
}
