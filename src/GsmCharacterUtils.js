
const {
  isGsmChar, getSmsCharCountInfo, replaceNonGsmChars
} = require('./SmsUtil');

/**
 * Returns an object with the following values:
 * - charCount: <number>        // number of characters in input text
 * - msgCount: <number>         // number of sms message parts needed for the input text
 * - charPerSegment: <number>   // number of characters that will fit inside each message part
 * - encoding: <'GSM'/'UCS2'>   // the encoding required for the input text, any non-gsm text will use UCS2
 */
function getCharCount(text) {
    const ret = getSmsCharCountInfo(text);
    if(ret.isGsmEncoding) {
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
function removeNonGsmChars(msgText, replacementChar='?') {
    if(typeof msgText !== 'string' && !(msgText instanceof String)) {
        return '';
    }

    msgText = msgText
        .replace(/[\u2018\u2019\u201A`]/g, "\'")
        .replace(/[\u201C\u201D\u201E\u00AB\u00BB]/g, "\"")
        .replace(/\u2026/g, "...")
        .replace(/[\u2013\u2014]/g, "-")
        ;

    return replaceNonGsmChars(msgText, replacementChar);
}

module.exports = {
    getCharCount,
    isGsmChar,
    removeNonGsmChars
};