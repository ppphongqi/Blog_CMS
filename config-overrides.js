const { injectBabelPlugin } = require('react-app-rewired'); /* eslint-disable-line */
const rewireMobX = require('react-app-rewire-mobx');
const {
    override,
    fixBabelImports,
    addDecoratorsLegacy
} = require('customize-cra');


module.exports = override(
  addDecoratorsLegacy()
)
