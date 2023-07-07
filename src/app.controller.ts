import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  joblisting() {
    console.log('CAME HERE joblisting');
    return { success: true };
  }
}
