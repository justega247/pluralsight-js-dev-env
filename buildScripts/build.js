/*eslint-disable no-console*/

import webpack from 'webpack';
import chalk from 'chalk';
import webpackConfig from '../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production, this will take a moment'));

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occured. stop here
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warnings => console.log(chalk.yellow(warnings)));
  }

  console.log(`Webpack stats: ${stats}`);

  // If we got this far,the build succeeded
  console.log(chalk.green('Your app has been built for production and written to /dist!'));

  return 0;
});
