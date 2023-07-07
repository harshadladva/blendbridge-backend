import { Page } from 'playwright';
import { getInnerText, getPage } from '../utils';

const URL =
  'https://www.google.com/about/careers/applications/jobs/results/?q=&location=India&has_remote=false&distance=50&hl=en_US&jlo=en_US';
export default async function fetchJobs() {
  const page = await getPage();
  await page.goto(URL);

  const jobPosts = await page
    .locator('main > div > c-wiz > div > ul > li')
    .all();

  const results = [];
  for (const post of jobPosts) {
    const dataEls = await post.locator('.sMn82b > div').all();

    const title = await getInnerText(dataEls[0]);
    const place = await getInnerText(dataEls[2]);

    const [company, address] = place.split('|').map((item) => item.trim());
    const description = await dataEls[3].innerHTML();

    const link = await dataEls[4].locator('a').getAttribute('href');

    results.push({
      title,
      description,
      company,
      address,
      link: `https://www.google.com/about/careers/applications/${link}`,
    });
  }
  return results;
}
