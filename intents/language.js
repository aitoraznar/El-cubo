/* eslint-disable quote-props */
const { baseChars, getArgument, getRawInput } = require('../lib/common');

const VALID_LANGUAGES = {
  'english': 'en',
  'ingles': 'en',
  'spanish': 'es',
  'espanol': 'es',
  'castellano': 'es',
};

const getLanguageBasedOnArg = (lang) => {
  if (!lang) return false;
  const baseLang = baseChars(lang);
  return VALID_LANGUAGES[baseLang];
};

const processChangeLanguage = (lang, conv, scure) => {
  const locale = getLanguageBasedOnArg(lang);
  console.info('_____>LOCALE', locale);
  //TODO Change current language from Input
  if (locale) {
    conv.data.language = locale;
    conv.data.dontChangeLanguage = 1;
    const newScure = scure.setLanguage(conv.data.language);
    conv.ask(newScure.sentences.get('changed-language', { lang }));
  } else {
    conv.ask(scure.sentences.get('changed-language-unknown', { lang }));
  }
  return true;
};

const language = scure => (conv, args) => {
  const lang = getArgument(args, 'arg');
  processChangeLanguage(lang, conv, scure);
};

const getLanguageFromInput = (input) => {
  const rawInput = baseChars(input);
  const langs = Object.keys(VALID_LANGUAGES);
  const words = rawInput.split(' ');
  const lang = words.find(w => langs.indexOf(w) >= 0);
  return lang;
};

const checkAndChangeLangageForInput = (scure, conv, args) => {
  //TODO get current language from Input
  //const lang = getLanguageFromInput(getRawInput(args, 'arg'));
  const lang = 'espanol';
  return lang ? processChangeLanguage(lang, conv, scure) : false;
};

// exports.language = language;
exports.checkAndChangeLanguage = (scure, conv, args) =>
  (getRawInput(conv, args) ? checkAndChangeLangageForInput(scure, conv, args) : false);

