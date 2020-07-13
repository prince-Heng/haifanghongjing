const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {


    lintOnSave: false,
    css: { loaderOptions: { postcss: { plugins: [autoprefixer({ browsers: ['Android >= 4.0', 'iOS >= 7'] }), pxtorem({ rootValue: 37.5, propList: ['*'], })] } } }
};