export const toCamelCase = (text) => {
    if(!text) return '';

    return text.replace(/[-_]/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index){ 
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
