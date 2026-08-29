export const earthImages = Array.from({ length: 12 }, (_, i) => ({
  id: `earth-${i + 1}`,
  date: `2026-0${(i % 9) + 1}-2${i % 9}`,
  caption: `Earth full-disc capture — orbit pass ${i + 1}`,
  img: `https://picsum.photos/seed/earth${i}/700/700`,
}));
