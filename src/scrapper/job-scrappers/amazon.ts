import { Page } from 'playwright';
import { getInnerText, getPage, slugify } from '../utils';

const URL =
  'https://www.amazon.jobs/en-gb/search?base_query=&loc_query=India&latitude=&longitude=&loc_group_id=&invalid_location=false&country=IND&city=&region=&county=';

export default async function fetchJobs() {
  const page = await getPage();
  await page.goto(URL);

  const jobPosts = await page.locator('.job-tile > a').all();
  const results = [];
  for (const post of jobPosts) {
    const title = await getInnerText(post.locator('.job-title'));

    const locationAndId = await getInnerText(post.locator('.location-and-id'));
    const address = locationAndId.split('|').at(0).trim();
    const description = await post
      .locator('.qualifications-preview')
      .innerHTML();

    const link = await post.getAttribute('href');

    results.push({
      title,
      description,
      company: 'Microsoft',
      address,
      link: `https://www.amazon.jobs${link}`,
    });
  }
  return results;
}
