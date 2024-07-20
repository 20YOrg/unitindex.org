import { createDirectus, rest } from '@directus/sdk';

const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_DIRECTUS_API_URL is not defined');
}

const directus = createDirectus(apiUrl).with(rest());

export default directus;