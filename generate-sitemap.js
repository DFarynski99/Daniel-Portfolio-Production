// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const baseUrl = 'https://danielfarynski.com'; // Replace with your domain

const pages = [
  '/', 
  '/project-dark', 
  '/web-development', 
  '/case-studies',
  '/contact',
  '/case-study-1',
  '/case-study-2'
];

const stream = new SitemapStream({ hostname: baseUrl });

streamToPromise(Readable.from(pages.map(path => ({ url: path }))).pipe(stream))
  .then(data => {
    createWriteStream('dist/sitemap.xml').write(data.toString());
    console.log('✅ sitemap.xml generated in dist/');
  })
  .catch(console.error);
