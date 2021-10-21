const { optimize } = require('svgo');
const cheerio = require('cheerio')
const framework = process.env.npm_package_config_framework || 'react'

/**
 * Convert string to CamelCase.
 * @param {string} str - A string.
 * @returns {string}
 */
function CamelCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
function optimizeSVG(svg) {
  return new Promise(resolve => {
    optimize(svg, {
      plugins: [
        { convertShapeToPath: false },
        { mergePaths: false },
        { removeAttrs: { attrs: 'stroke.*' } },
        { removeTitle: true }
      ]
    }).then(({ data }) => resolve(data));
  });
}

/**
 * remove SVG element.
 * @param {string} svg - An SVG string.
 * @returns {string}
 */
function removeSVGElement(svg) {
  const $ = cheerio.load(svg);
  return $('body').children().html();
}

/**
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @param {Promise<string>}
 */
async function processSvg(svg) {
  const optimized = await optimizeSVG(svg)
    // remove semicolon inserted by prettier
    // because prettier thinks it's formatting JSX not HTML
    .then(svg => svg.replace(/;/g, ''))
    .then(removeSVGElement)
    .then(svg =>
      framework==='react' ?
      svg.replace(/([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${CamelCase(b)}=`) :
      svg
    )
  return optimized;
}

module.exports = processSvg;
