import i18n from './language';

export function numToLetter(num, big = false) {
  switch (num) {
    case 1: return big ? 'A' : 'a';
    case 2: return big ? 'B' : 'b';
    case 3: return big ? 'C' : 'c';
    case 4: return big ? 'D' : 'd';
    case 5: return big ? 'E' : 'e';
    case 6: return big ? 'F' : 'f';
    case 7: return big ? 'G' : 'g';
    case 8: return big ? 'H' : 'h';
    case 9: return big ? 'I' : 'i';
    case 10: return big ? 'J' : 'j';
    case 11: return big ? 'K' : 'k';
    case 12: return big ? 'L' : 'l';
    case 13: return big ? 'M' : 'm';
    case 14: return big ? 'N' : 'n';
    case 15: return big ? 'O' : 'o';
    case 16: return big ? 'P' : 'p';
    case 17: return big ? 'Q' : 'q';
    case 18: return big ? 'R' : 'r';
    case 19: return big ? 'S' : 's';
    case 20: return big ? 'T' : 't';
    case 21: return big ? 'U' : 'u';
    case 22: return big ? 'V' : 'v';
    case 23: return big ? 'W' : 'w';
    case 24: return big ? 'X' : 'x';
    case 25: return big ? 'Y' : 'y';
    case 26: return big ? 'Z' : 'z';
    default: return null;
  }
}
export function letterToNum(letter) {
  switch (letter) {
    case 'A' || 'a': return 1;
    case 'B' || 'b': return 2;
    case 'C' || 'c': return 3;
    case 'D' || 'd': return 4;
    case 'E' || 'e': return 5;
    case 'F' || 'f': return 6;
    case 'G' || 'g': return 7;
    case 'H' || 'h': return 8;
    case 'I' || 'i': return 9;
    case 'J' || 'j': return 10;
    case 'K' || 'k': return 11;
    case 'L' || 'l': return 12;
    case 'M' || 'm': return 13;
    case 'N' || 'n': return 14;
    case 'O' || 'o': return 15;
    case 'P' || 'p': return 16;
    case 'Q' || 'q': return 17;
    case 'R' || 'r': return 18;
    case 'S' || 's': return 19;
    case 'T' || 't': return 20;
    case 'U' || 'u': return 21;
    case 'V' || 'v': return 22;
    case 'W' || 'w': return 23;
    case 'X' || 'x': return 24;
    case 'Y' || 'y': return 25;
    case 'Z' || 'z': return 26;
    default: return null;
  }
}
export function numToChinese(num) {
  if (i18n.locale == 'en') return num;
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  if (num == 0) return changeNum[0];
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    // console.log(strArr)
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = "0" + noWan;
  }
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
export function getFileSizeString(size, pointLength) {
  let unit;
  let units = ['B', 'KB', 'MB', 'GB'];
  while ((unit = units.shift()) && size > 1024) size = size / 1024;
  return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit;
}