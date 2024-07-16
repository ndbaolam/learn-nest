import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCatDTO } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './validation/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createCatDTO: CreateCatDTO) {
    this.catsService.create(createCatDTO);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
