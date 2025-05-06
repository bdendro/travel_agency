import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import levels from './levels.js';
import formatMessage from './formatter.js';
import getErrorInfo from './getErrorInfo.js';
import { ENV_LOCAL } from '../../constants/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..', '..', '..');

class Logger {
  constructor(logPath = path.join(rootDir, 'logs', 'app.log')) {
    this.logPath = logPath;

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }
  }

  __writeMsg(msg) {
    if (process.env.APP_ENV === ENV_LOCAL) {
      console.log(msg);
    } else {
      fs.appendFile(this.logPath, `${msg}\n`, (err) => {
        if (err) {
          console.error('Error while try to put data into file', err.message);
        }
      });
    }
  }

  __log(level, msg) {
    const formattedMsg = formatMessage(level, msg);

    this.__writeMsg(formattedMsg);
  }

  info(msg) {
    this.__log(levels.INFO, msg);
  }

  warning(msg) {
    this.__log(levels.WARNING, msg);
  }

  error({ msg, err }) {
    let message;

    if (err instanceof Error && typeof msg === 'string') {
      message = `${err.name}, ${err.message}, ${msg}`;
      const addErrInfo = getErrorInfo(err);
      if (addErrInfo) {
        message += `, ${addErrInfo}`;
      }
    } else if (err instanceof Error) {
      message = `${err.name}, ${err.message}`;
      const addErrInfo = getErrorInfo(err);
      if (addErrInfo) {
        message += `, ${addErrInfo}`;
      }
    } else {
      message = String(msg);
    }

    this.__log(levels.ERROR, message);
  }
}

export default Logger;