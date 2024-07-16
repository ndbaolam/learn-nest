import { Injectable, HttpStatus } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(cat: Cat): Cat {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat | null {
    return this.cats.find((item: Cat) => item.age === id);
  }
}
