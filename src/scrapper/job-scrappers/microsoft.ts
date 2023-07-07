import { Page } from 'playwright';
import { getInnerText, getPage, slugify } from '../utils';

const URL =
  'https://jobs.careers.microsoft.com/global/en/search?lc=India&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true';

export default async function fetchJobs() {
  const page = await getPage();
  await page.goto(URL);

  await page.waitForEvent('domcontentloaded');
  await page.waitForSelector('[data-automationid="ListCell"]');
  const jobPosts = await page.locator('[data-automationid="ListCell"]').all();
  const results = [];
  for (const post of jobPosts) {
    const title = await getInnerText(post.locator('h2'));

    const address = await getInnerText(
      post.locator('[aria-label="job location icon"] ~ span'),
    );
    const description = await post
      .locator('[aria-label="job description"]')
      .innerHTML();

    const idLabel = await post.locator('>div').getAttribute('aria-label');

    const id = idLabel.replace('Job item', '').trim();
    results.push({
      title,
      description,
      company: 'Microsoft',
      address,
      link: `https://jobs.careers.microsoft.com/global/en/job/${id}/${slugify(title)}`,
    });
  }
  return results;
}
