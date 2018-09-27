require('ts-node').register({
  project: `${__dirname}/scripts/gulp/tsconfig.json`
});
require(`${__dirname}/scripts/gulp/gulpfile`);
