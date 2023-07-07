import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { getPage, slugify } from './utils';

@Controller('joblisting')
export class ScrapperController {
  constructor(public scrapperService: ScrapperService) {}

  @Get()
  joblisting() {
    return this.scrapperService.getSavedJSON();
  }

  @Get('prepare')
  async prepare() {
    return this.scrapperService.prepare();
  }

  @Get(':company')
  async fetchJobs(@Param('company') company: string) {
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

  @Get('with-scrapper/:company')
  async googleScrapper(@Param('company') company: string) {
    try {
      const fetchJobs = (
        await import(`./job-scrappers/${slugify(company)}`)
      ).default;
      const jobs = await fetchJobs();
      return jobs;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error while fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
