/* eslint-disable no-var */
import LogLevel from './log_level';

declare global {
  // eslint-disable-next-line vars-on-top
  var log_level: LogLevel;
}

export {};
