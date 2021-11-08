const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

module.exports = function (ctx) {
  // Make sure android platform is part of build
  if (!ctx.opts.platforms.includes('android')) return;

  const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
  const apkFileLocation = path.join(platformRoot, 'app/build/outputs/apk/debug/app-debug.apk');

  return stat(apkFileLocation).then(stats => {
    console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
  });
};