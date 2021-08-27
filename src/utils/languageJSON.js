import i18n from '@/utils/language/index';
const files = require.context('./language', true, /\.js$/);
// import allText from "@/language.json";

let languageJSON = {};

let languages = i18n.languages.map((item, index) => {
  return item.value;
});

let keys2 = files.keys();

async function getJSON(language) {
  return new Promise(async (resolve, reject) => {
    // console.log(keys2, keys2.length)
    for (let i = 0; i < keys2.length; i++) {
      let key = keys2[i];
      // console.log(key);
      if (key == './index.js') continue;
      const temp = key.replace('./', '').replace('.js', '').split('/');
      await import(`./language/${temp}`).then(res => {
        if (language instanceof Array) {
          languageJSON[temp] = convertAllLanguage(res.default, language);
        } else if (typeof language == "string") {
          if (JSON.stringify(res.default[language]) == '{}') return;
          languageJSON[temp] = res.default[language];
        } else {
          reject("language unavalible")
        }
      }).catch(err => {
        console.log(err);
        reject(false)
      });
    }
    resolve(languageJSON);
  });
}

function convertAllLanguage(data, languages) {
  let result = {};
  for (let i = 0; i < languages.length; i++) {
    for (let key in data[languages[i]]) {
      if (result[key]) continue;
      if (typeof data[languages[i]][key] == 'object') {
        let childItems = {};
        for (let j = 0; j < languages.length; j++) {
          childItems[languages[j]] = data[languages[j]][key];
        }
        let child = convertAllLanguage(childItems, languages);
        result[key] = child;
      } else {
        result[key] = (() => {
          let _res = {};
          for (let j = 0; j < languages.length; j++) {
            let _item = data[languages[j]][key];
            _res[languages[j]] = _item || "none";
          }
          return _res;
        })();
      }
    }
  }
  return result;
}

let duplicate = {};
function getDuplicate(options) {
  let { data, path, withPath, checkLang, standardLang, noRepeat } = options;
  path = path || [];
  withPath = withPath || false;
  checkLang = checkLang || "en";
  standardLang = standardLang || "zh";
  noRepeat = noRepeat || false;
  for (let key in data) {
    switch (key) {
      case standardLang:
        if (!withPath) {
          if (!duplicate[data[standardLang]]) {
            duplicate[data[standardLang]] = [data[checkLang]];
          } else {
            if (!noRepeat || duplicate[data[standardLang]].indexOf(data[checkLang]) == -1) {
              duplicate[data[standardLang]].push(data[checkLang]);
            }
          }
        } else {
          if (!duplicate[data[standardLang]]) {
            duplicate[data[standardLang]] = [{ text: data[checkLang], path: path.join(".") }];
          } else {
            let exist = false;
            for (let i = 0; i < duplicate[data[standardLang]].length; i++) {
              if (duplicate[data[standardLang]][i].text == data[checkLang]) {
                exist = true;
                break;
              }
            }
            if (!noRepeat || !exist) {
              duplicate[data[standardLang]].push({ text: data[checkLang], path: path.join(".") });
            }
          }
        }
        break;
      case checkLang: break;
      default:
        let _path = [...path, key];
        getDuplicate({ data: data[key], path: _path, withPath, checkLang, standardLang, noRepeat });
        break;
    }
  }
}
function getTwoVersionDuplicate() {
  let result = { ...duplicate };
  for (let key in result) {
    if (result[key].length < 2) {
      delete result[key];
    }
  }
  return result;
}

let noTranslate = {};
function getNoTranslate(options) {
  let { data, path, standardLang, checkLang, getAll } = options;
  path = path || [];
  standardLang = standardLang || "zh";
  checkLang = checkLang || "en";
  getAll = getAll || false;
  // 找出两边字符串一样的，或只有一边是有内容，或只有一边是有该字段的
  switch (getAll) {
    case false:
      for (let key in data) {
        switch (key) {
          case standardLang:
            if (data[standardLang] == data[checkLang] || !data[checkLang]) {
              noTranslate[data[standardLang]] = [...(noTranslate[data[standardLang]] || []), {
                text: data[checkLang] || null,
                path: path.join("."),
              }]
            }
            break;
          case checkLang: break;
          default:
            let _path = [...path, key];
            getNoTranslate({ data: data[key], path: _path, standardLang, checkLang, getAll });
            break;
        }
      }
      break;
    case true:
      for (let key in data) {
        if (key == standardLang) {
          for (let i = 0; i < languages.length; i++) {
            console.log(languages[i])
            if (languages[i] == standardLang) continue;
            else {
              let _checkLang = languages[i];
              if (data[standardLang] == data[_checkLang] || !data[_checkLang]) {
                noTranslate[data[standardLang]] = [...(noTranslate[data[standardLang]] || []), {
                  lang: languages[i],
                  text: data[_checkLang] || null,
                  path: path.join("."),
                }]
              }
            }
          }
        } else if (languages.indexOf(key) == -1) {
          let _path = [...path, key];
          getNoTranslate({ data: data[key], path: _path, standardLang, checkLang, getAll });
        }
      }
  }
}

export function getNoTranslateJSONFile(options, callback) {
  languageJSON = {};
  getJSON(options.checkLang == 'allLang' ? languages : [options.standardLang, options.checkLang]).then(res => {
    noTranslate = {};
    let { standardLang, checkLang, getAll } = options;
    standardLang = standardLang || "zh";
    checkLang = checkLang || "en";
    getAll = checkLang == 'allLang';
  console.log(checkLang)
    console.log(getAll)
    getNoTranslate({ ...options, getAll, data: res });
    let str = JSON.stringify(noTranslate);
    let blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    let downLink = document.createElement('a');
    downLink.download = "noTranslate.json";
    downLink.href = URL.createObjectURL(blob);
    document.body.appendChild(downLink);
    downLink.click();
    document.body.removeChild(downLink);
    callback();
    return true;
  });
}

export function getDuplicateJSONFile(options, callback) {
  languageJSON = {};
  getJSON([options.standardLang, options.checkLang]).then(res => {
    duplicate = {};
    let { checkLang, standardLang, withPath, twoVersionFilter, noRepeat } = options;
    checkLang = checkLang || "en";
    standardLang = standardLang || "zh";
    withPath = withPath || false;
    twoVersionFilter = twoVersionFilter || false;
    noRepeat = noRepeat || false;
    getDuplicate({ data: res, withPath, checkLang, noRepeat });
    let str = JSON.stringify(twoVersionFilter ? getTwoVersionDuplicate() : duplicate);
    let blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    let downLink = document.createElement('a');
    downLink.download = "duplicate.json";
    downLink.href = URL.createObjectURL(blob);
    document.body.appendChild(downLink);
    downLink.click();
    document.body.removeChild(downLink);
    callback();
    return true
  });
}

export function getLanguageJSONFile(language) {
  languageJSON = {};
  getJSON(language).then(data => {
    let str = JSON.stringify(data);
    let blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    console.log(data);
    let downLink = document.createElement('a')
    downLink.download = "language.json"
    downLink.href = URL.createObjectURL(blob)
    document.body.appendChild(downLink)
    downLink.click()
    document.body.removeChild(downLink)
  }).catch(err => {
    alert("没有这个语言");
  });
}