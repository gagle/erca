import { exec } from 'child_process';
import { task } from 'gulp';
import { promisify } from 'util';
const pkg = require('../../../package.json');
const semver = require('semver');
const conventionalRecommendedBump = require('conventional-recommended-bump');

task('version', async () => {
  const recommendation = await promisify(conventionalRecommendedBump)({
    preset: 'angular'
  });

  console.log(
    `Recommended version change: ${recommendation.releaseType}, ${
      pkg.version
    } → ${semver.inc(pkg.version, recommendation.releaseType)}`
  );
  console.log('Updating version and changelog...');

  await promisify(exec)(`npm version ${recommendation.releaseType}`);
});
