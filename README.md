# GSM Character Set Utilities

Functions for counting SMS message parts and removing non-GSM alphabet characters.

The SMS character counter on https://www.teletopiasms.no/p/utilities/sms-char-counter uses code from this package.
This page uses functionality exported from the `SmsUtils.js` file, which is not the main export for the package.

## Usage

Basic usage of the functions:
```
import * as GsmCharsetUtils from '@trt2/gsm-charset-utils';
// This imports:
// - GsmCharsetUtils.getCharCount(text)
// - GsmCharsetUtils.isGsmChar(c)
// - GsmCharsetUtils.removeNonGsmChars(msgText)


let charCount = GsmCharsetUtils.getCharCount('Hello world!');
// charCount = {"charCount":12,"msgCount":1,"charsPerSegment":160,"encoding":"GSM"}

charCount = GsmCharsetUtils.getCharCount('Test UCS2 backtick `');
// charCount = {"charCount":20,"msgCount":1,"charsPerSegment":70,"encoding":"UCS2"}

charCount = GsmCharsetUtils.getCharCount('Test UCS2 emoji 😀');
// charCount = {"charCount":18,"msgCount":1,"charsPerSegment":70,"encoding":"UCS2"}

GsmCharsetUtils.isGsmChar('a'); // returns true

// removeNonGsmChars() will replace non-GSM characters with '?',
// but it will convert a very limited number of characters to
// similar characters in the GSM alphabet.
let gsmText = GsmCharsetUtils.removeNonGsmChars("Hello world!");
// gsmText = "Hello world!"

let gsmText = GsmCharsetUtils.removeNonGsmChars("«Hello world!»");
// gsmText = "\"Hello world!\""

```


## function getCharCount(text)
- `text`

Returns an object:
```
{
    "charCount": <number>,          // Total character count
    "msgCount": <number>,           // Number of SMS messages
    "charsPerSegment": <number>,    // Characters per message segment
    "encoding": <string: "GSM" or "UCS2">
}
```

The function will not split messages on an extended GSM character or a UCS2 surrogate pair, the whole character is moved to the next segment.

## function isGsmChar( c )
- `c` - Check if this character is part of either the GSM alphabet or the extended GSM alphabet.

## function removeNonGsmChars(msgText, replacementChar='?')
- `msgText` - Text from which non-GSM characters will be removed.
- `replacementChar` - The character to replace non-GSM characters with

Non-GSM characters will be replaced by `replacementChar`, a very limited number of characters will be converted to similar characters in the GSM alphabet.
