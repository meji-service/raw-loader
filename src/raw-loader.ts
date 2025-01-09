
export default function rawLoader(source) {
  const { mode } = this.getOptions();
  switch(mode) {
    case 'raw':
      return source;
    case 'base64':
      return Buffer.from(source, 'utf-8').toString('base64');
    case 'common':
      return `module.exports = ${toStringify(source)};`;
    case 'es': 
      return `export default ${toStringify(source)}`;
    default:
      throw new Error(`Invalid mode "${mode}"`);
  }

}

function toStringify(source) {
  return JSON.stringify(source).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}