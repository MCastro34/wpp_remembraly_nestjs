import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { WppService } from './wpp.service';
import { MessageReceivedDTO } from './dto/wpp.dto';

@Controller('wpp')
export class WppController {
  constructor(private readonly wppService: WppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    const result = this.wppService.verifyWebhook(mode, token, challenge);
    if (!result) {
      throw new ForbiddenException();
    }
    return challenge;
  }

  @Post()
  receiveMessage(@Body() args: MessageReceivedDTO) {
    return this.wppService.receiveMessage(args);
  }
}
