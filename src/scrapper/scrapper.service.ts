import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { companies } from '../../companies.json';

const RESULT_PATH = './results/';

@Injectable()
export class ScrapperService {
  async getPage() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    page.setExtraHTTPHeaders({
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    });
    return page;
  }

  private async getInnerText(locator) {
    const count = await locator.count();
    if (count === 0) {
      return '';
    }

    const text = await locator.innerText();
    return text;
  }

  private slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  public async fetchJobs(companyName, page) {
    const k = encodeURIComponent(companyName.toLowerCase());
    await page.goto(
      `https://www.naukri.com/${this.slugify(
        companyName.toLowerCase(),
      )}-jobs?k=${k}`,
    );

    await page.waitForSelector('[data-job-id]');
    const locators = await page.locator('[data-job-id]').all();

    const jobposts = [];
    for (const locator of locators) {
      const title = await this.getInnerText(locator.locator('.title').first());
      const subTitle = await this.getInnerText(
        locator.locator('.subTitle').first(),
      );

      const experience = await this.getInnerText(
        locator.locator('.experience').first(),
      );

      const salary = await this.getInnerText(
        locator.locator('.salary').first(),
      );

      const location = await this.getInnerText(
        locator.locator('.location').first(),
      );

      const jobDescription = await this.getInnerText(
        locator.locator('.job-description').first(),
      );

      jobposts.push({
        company: companyName,
        title,
        subTitle,
        experience,
        salary,
        location,
        jobDescription,
      });
    }

    return jobposts;
  }

  public async prepare() {
    try {
      const page = await this.getPage();
      const jobs = [];
      console.log(companies);
      for (const company of companies) {
        const jobPosts = await this.fetchJobs(company, page);
        jobs.push(...jobPosts);
      }
      await page.close();
      this.saveFile('jobposts.json', jobs);
      return { status: 'success' };
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error while saving data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private saveFile(path, data, dir = '') {
    mkdirSync(RESULT_PATH + dir, { recursive: true });
    writeFileSync(
      `${RESULT_PATH}${dir ? `${dir}/` : ''}${path}`,
      JSON.stringify(data, null, 2),
    );
  }

  public async getSavedJSON() {
    try {
      const jobs = readFileSync(`${RESULT_PATH}jobposts.json`, 'utf8');
      return JSON.parse(jobs);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error while fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
