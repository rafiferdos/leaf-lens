const icons = require('@hugeicons/core-free-icons');
const keys = Object.keys(icons);
console.log(keys.filter(k => k.toLowerCase().includes('sprout') || k.toLowerCase().includes('leaf') || k.toLowerCase().includes('plant')).join('\n'));
