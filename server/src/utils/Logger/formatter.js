import chalk from 'chalk';
import levels from './levels.js';

function formatMessage(level, msg) {
  const timestamp = new Date().toISOString();
  const formattedMsg = `[${timestamp}] ${level.toUpperCase()}: ${msg}`;

  switch (level) {
    case levels.INFO:
      return chalk.blue(formattedMsg);
    case levels.WARNING:
      return chalk.yellow(formattedMsg);
    case levels.ERROR:
      return chalk.red(formattedMsg);
    default:
      return chalk.grey(formattedMsg);
  }
}

export default formatMessage;