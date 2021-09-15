import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService
  ) {}

  async findUser(username: string) {
    const user = await this.userRepository.find({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const client = this.userRepository.create({ ...createUserDto });
    this.userRepository.save(client);
    await this.mailService.sendUserConfirmation(client, token);
    return 'This action adds a new package';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
