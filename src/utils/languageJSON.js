const files = require.context('./language', true, /\.js$/);

let languageJSON = {};

let keys2 = files.keys();

async function getJSON(language) {
  return new Promise(async (resolve, reject) => {
    console.log(keys2, keys2.length)
    for (let i = 0; i < keys2.length; i++) {
      let key = keys2[i];
      console.log(key);
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

export default function getLanguageJSONFile(language) {
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