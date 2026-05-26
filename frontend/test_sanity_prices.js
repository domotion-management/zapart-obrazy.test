const fs = require('fs');
const { createClient } = require('next-sanity');

// Read env file
const envText = fs.readFileSync('./.env.local', 'utf8');
const projectId = envText.match(/NEXT_PUBLIC_SANITY_PROJECT_ID\s*=\s*(.*)/)?.[1]?.trim();
const dataset = envText.match(/NEXT_PUBLIC_SANITY_DATASET\s*=\s*(.*)/)?.[1]?.trim() || 'production';

console.log('Project ID:', projectId);
console.log('Dataset:', dataset);

if (!projectId) {
  console.error('No project ID found');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-05-01',
  useCdn: false, // Bypass CDN
});

client.fetch('*[_type == "artwork"] { _id, title, price }')
  .then(artworks => {
    console.log('Total artworks found:', artworks.length);
    artworks.forEach(art => {
      console.log(`ID: ${art._id}, Title: ${art.title}, Price: ${art.price} (${typeof art.price})`);
    });
  })
  .catch(err => {
    console.error('Fetch error:', err);
  });
