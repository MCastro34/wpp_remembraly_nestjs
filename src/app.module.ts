import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WppModule } from './wpp/wpp.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule.forRoot(), WppModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
