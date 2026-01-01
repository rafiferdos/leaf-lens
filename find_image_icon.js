const icons = require('@hugeicons/core-free-icons');
const keys = Object.keys(icons);
console.log(keys.filter(k => k.toLowerCase().includes('image') && k.endsWith('Icon')).join('\n'));
