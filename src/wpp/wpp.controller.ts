import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WppService } from './wpp.service';
import { MessageReceivedDTO } from './dto/wpp.dto';

@Controller('wpp')
export class WppController {
  constructor(private readonly wppService: WppService) {}

  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    return this.wppService.verifyWebhook(mode, token, challenge);
  }

  @Post()
  receiveMessage(@Body() args: MessageReceivedDTO) {
    return this.wppService.receiveMessage(args);
  }
}
