import { readFileSync, existsSync } from "fs";
const CACHE = new Map();

export function loadLanguage(lang = "ar_SY") {
  if (CACHE.has(lang)) return CACHE.get(lang);
  const path = `./languages/${lang}.json`;
  if (!existsSync(path)) {
    // fallback للإنجليزية إن لزم
    const en = existsSync("./languages/en_US.json")
      ? JSON.parse(readFileSync("./languages/en_US.json", "utf8"))
      : {};
    CACHE.set(lang, en);
    return en;
  }
  const data = JSON.parse(readFileSync(path, "utf8"));
  CACHE.set(lang, data);
  return data;
}

export function getLangFactory({ threadLang, defaultLang = "ar_SY" } = {}) {
  const langKey = threadLang || defaultLang;
  const dict = loadLanguage(langKey);

  /**
   * getLang(key, params?)
   * أمثلة:
   *  getLang("help.list", { list, total, syntax })
   */
  return function getLang(key, params = {}) {
    let str = dict[key];
    if (typeof str !== "string") {
      // دعم مفاتيح مثل perm.0 ... الخ
      str = dict[key] || key;
    }
    return str.replace(/\{(\w+)\}/g, (_, k) =>
      params[k] !== undefined ? String(params[k]) : `{${k}}`
    );
  };
}
