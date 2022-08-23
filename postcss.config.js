module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*'],
      },
    },
  };


  //  rootValue({ file }) {
  //   return file.indexOf('vant') !== -1 ? 37.5 : 75;
  // },