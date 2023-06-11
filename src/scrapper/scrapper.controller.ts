import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(public scrapperService: ScrapperService) {}

  @Get()
  joblisting() {
    return this.scrapperService.getSavedJSON();
  }

  @Get('fetch-jobs/:company')
  async fetchJobs(company: string) {
    try {
      const page = await this.scrapperService.getPage();
      const jobs = await this.scrapperService.fetchJobs(company, page);
      return jobs;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error while fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async prepare() {
    return this.scrapperService.prepare();
  }
}
