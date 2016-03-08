var getPackageJson = require('./gulp/package-json');
var config = require('./app/config');

// Configuration section start ==========================================
var inputDir = {
   app : './app',
   less : './theme/less',
   images : './theme/images'
};

var inputFile = {
   min : getPackageJson().name + '.js',
   full : inputDir.app + '/app.js',
   'less' : 'app.less',
   'lessFull' : inputDir.less + "/" + getPackageJson().name + '.less',
   karmaConfig : process.cwd() + '/karma.conf.js'
};

var outputDir = {
   root : './dist',
   buildRoot : './build',
   js : './dist/js',
   css : './dist/css',
   images : './dist/images',
   contentServerDev : (process.env.content_server_dev || '').replace(/"/g, ''), // assumes an environment variable content_server_dev
   contentServerPrePrd : (process.env.content_server_preprd || '').replace(/"/g, '')
};
var outputFile = {
   jsmin : getPackageJson().name + '.min.js',
   cssmin : getPackageJson().name + '.min.css',
   viewtemplates : 'templates.js',
   vewtemplates_module : config.configBlock.namespace + '.HTMLViewTemplates'
};

var webserver = {
   port : 8083
};

var config = {
   'inputDir' : inputDir,
   'inputFile' : inputFile,
   'outputDir' : outputDir,
   'outputFile' : outputFile,
   'webserver' : webserver
};

module.exports = config;
