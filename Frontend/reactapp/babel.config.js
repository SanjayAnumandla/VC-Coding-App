module.exports = {
    presets: ['react-app'],
    plugins: [
      ['@babel/plugin-transform-modules-commonjs', {
        loose: true,
        allowTopLevelThis: true
      }]
    ]
  };