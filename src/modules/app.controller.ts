import { Controller, Get } from '@common/decorators';
import { Context } from 'koa';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(ctx: Context) {
    const objects = await this.appService.findAll();
    ctx.body = objects;
  }

  @Get('random')
  async findRandom(ctx: Context) {
    const object = await this.appService.findRandom();
    ctx.body = object;
  }
}
