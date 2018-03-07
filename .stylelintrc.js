// https://stylelint.io/user-guide/configuration/
module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'string-quotes': 'single',
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],
    'order/properties-order': [],
  },
};
