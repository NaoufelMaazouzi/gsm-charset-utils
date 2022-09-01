'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeNonGsmChars = exports.isGsmChar = exports.getCharCount = undefined;

var _SmsUtil = require('./SmsUtil');

/**
 * Returns an object with the following values:
 * - charCount: <number>        // number of characters in input text
 * - msgCount: <number>         // number of sms message parts needed for the input text
 * - charPerSegment: <number>   // number of characters that will fit inside each message part
 * - encoding: <'GSM'/'UCS2'>   // the encoding required for the input text, any non-gsm text will use UCS2
 */
function getCharCount(text) {
    var ret = (0, _SmsUtil.getSmsCharCountInfo)(text);
    if (ret.isGsmEncoding) {
        ret.gsmCharCount.encoding = 'GSM';
        return ret.gsmCharCount;
    } else {
        ret.ucs2CharCount.encoding = 'UCS2';
        return ret.ucs2CharCount;
    }
}

/**
 * Replace all non-gsm charset characters in the msgText string.
 * Some characters will be mapped to valid gsm characters:
 * - ‘’‚`   (mapped to single quote)
 * - “”„«»  (mapped to double quotes)
 * - …      (mapped to '...')
 * - –—     (mapped to -)
 * - others will be mapped to ?
 */
 function removeNonGsmChars(msgText) {
  const toReplace = {
    ...["\u2018", "\u2019", "\u201A"].reduce((acc, key) => ({ ...acc, [key]: "\'" }), {}),
    ...["\u00F4"].reduce((acc, key) => ({ ...acc, [key]: "o" }), {}),
    ...["\u00CA", "\u00C8"].reduce((acc, key) => ({ ...acc, [key]: "E" }), {}),
    ...["\u00FB"].reduce((acc, key) => ({ ...acc, [key]: "u" }), {}),
    ...["\u00E7"].reduce((acc, key) => ({ ...acc, [key]: "c" }), {}),
    ...["\u201C", "\u201D", "\u201E", "\u00AB", "\u00BB"].reduce((acc, key) => ({ ...acc, [key]: "\"" }), {}),
    ...["\u2026"].reduce((acc, key) => ({ ...acc, [key]: "..." }), {}),
    ...["\u2013" , "\u2014"].reduce((acc, key) => ({ ...acc, [key]: "-" }), {}),
    ...["\u00B0"].reduce((acc, key) => ({ ...acc, [key]: "" }), {}),
  }
  var replacementChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';

  if (typeof msgText !== 'string' && !(msgText instanceof String)) {
      return '';
  }

  msgText = msgText.replace(/[\u2018\u2019\u201A\u00CA\u00C8\u201C\u201D\u201E\u00AB\u00BB\u2026\u2013\u2014\u00B0\u00FB\u00E7\u00F4`]/g, match => toReplace[match]);
  return (0, _SmsUtil.replaceNonGsmChars)(msgText, replacementChar);
}

exports.getCharCount = getCharCount;
exports.isGsmChar = _SmsUtil.isGsmChar;
exports.removeNonGsmChars = removeNonGsmChars;