import { Controller, Get } from '@nestjs/common';
import { WppService } from './wpp.service';

@Controller('wpp')
export class WppController {
  constructor(private readonly wppService: WppService) {}

  @Get()
  findAll() {
    return 'Find all Wpp';
  }
}
