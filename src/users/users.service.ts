import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number, username?: string): Promise<User | null> {
    if(username) {
      return this.usersRepository.findOne({
        where: {
          username: username
        }
      });
    }
    
    return this.usersRepository.findOne({
      where: {
        id: id
      }
    });
  }  

  async create (createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();

    newUser.password = createUserDto.password;
    newUser.username = createUserDto.username;

    return this.usersRepository.save(newUser);
  }

  async remove (id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }
}
