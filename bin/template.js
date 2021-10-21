const getAttrs = (style, iconData) => {
  const baseAttrs = {
    'xmlns': 'http://www.w3.org/2000/svg',
    'width': iconData.width,
    'height': iconData.height,
    'viewBox': `0 0 ${iconData.width} ${iconData.height}`,
    'aria-hidden': 'true',
    'v-on': '$listeners'
  }
  const fillAttrs = {
    ':fill': 'color'
  }
  const strokeAttrs = {
    ':stroke': 'color',
    'fill': 'none',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  }
  return Object.assign({}, baseAttrs, style==='fill' ? fillAttrs : strokeAttrs)
}
  
const getElementCode = (ComponentName, attrs, svgCode) => `
  <template>
    <svg
      ${attrs}
      :width="size || width"
      :height="size || height"
    >
      ${svgCode}
    </svg>
  </template>
  <script>
    export default {
      name: "Icon${ComponentName}",
      props: {
        size: {
          type: Number
        },
        color: {
          type: String,
          default: "currentColor"
        }
      },
      data(): {
        return {
          width: attrs.width,
          height: attrs.height
        };
      }
    };
  </script>
`

module.exports = { getAttrs, getElementCode }
