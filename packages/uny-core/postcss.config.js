module.exports = (ctx) => ({
  map: ctx.env === 'production' ? false : {},
  syntax: 'postcss-scss',
  plugins: {
    'postcss-easy-import': {},
    'postcss-sassy-mixins': {},
    'postcss-nested': {},
    'postcss-advanced-variables': {},
    'postcss-color-function': {},
    'postcss-calc': {},
    'postcss-flexbugs-fixes': {},
    'postcss-strip-inline-comments': {},
    'autoprefixer': { browsers: ['last 2 version'] },
    'css-mqpacker': {},
    'cssnano': ctx.env === 'production' ? {} : false
  }
});
