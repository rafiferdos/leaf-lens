const icons = require('@hugeicons/core-free-icons');
const keys = Object.keys(icons);
const targetIcons = [
    'ImageVIcon',
    'Camera01Icon',
    'Upload02Icon',
    'File01Icon',
    'MultiplicationSignIcon',
    'RefreshIcon',
    'ArrowLeft01Icon',
    'Search01Icon',
    'AlertCircleIcon',
    'CheckmarkCircle02Icon'
];

targetIcons.forEach(icon => {
    if (keys.includes(icon)) {
        console.log(`✅ ${icon} exists`);
    } else {
        console.log(`❌ ${icon} NOT found`);
        // Find suggestions
        const suggestions = keys.filter(k => k.toLowerCase().includes(icon.replace('Icon', '').replace(/[0-9]/g, '').toLowerCase())).slice(0, 5);
        console.log(`   Suggestions: ${suggestions.join(', ')}`);
    }
});
