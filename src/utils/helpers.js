/**
 * Format a number as a USD currency string.
 */
export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

/**
 * Truncate a string to a given max length.
 */
export const truncate = (str, maxLength = 60) =>
  str && str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

/**
 * Capitalise the first letter of each word.
 */
export const titleCase = (str) =>
  str
    ? str
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : '';

/**
 * Map FakeStoreAPI category slug to a display label.
 */
export const categoryLabel = (slug) => {
  const map = {
    electronics: 'Electronics',
    jewelery: 'Jewellery',
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
  };
  return map[slug] || titleCase(slug);
};

/**
 * Map category slug to an emoji icon.
 */
export const categoryIcon = (slug) => {
  const map = {
    electronics: '💻',
    jewelery: '💎',
    "men's clothing": '👔',
    "women's clothing": '👗',
  };
  return map[slug] || '🛍️';
};
