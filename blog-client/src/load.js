import editormd from "./components/editormd/editormd";

const load = {};

load.css = function (fileName, callback, into) {
  into = into || "head";
  callback = callback || function () {
  };

  let css = document.createElement("link");
  css.type = "text/css";
  css.rel = "stylesheet";
  css.onload = css.onreadystatechange = function () {
    editormd.loadFiles.css.push(fileName);
    callback();
  };

  css.href = fileName.endsWith(".css") ? fileName : fileName + ".css";

  if (into === "head") {
    document.getElementsByTagName("head")[0].appendChild(css);
  } else {
    document.body.appendChild(css);
  }
}

load.script = function (fileName, callback, into) {
  into = into || "head";
  callback = callback || function () {
  };

  let script = null;
  script = document.createElement("script");
  script.id = fileName.replace(/[\./]+/g, "-");
  script.type = "text/javascript";
  script.src = fileName + ".js";

  if (getIEVersion() === 8) {
    script.onreadystatechange = function () {
      if (script.readyState) {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          editormd.loadFiles.js.push(fileName);
          callback();
        }
      }
    };
  }
  else {
    script.onload = function () {
      editormd.loadFiles.js.push(fileName);
      callback();
    };
  }

  if (into === "head") {
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    document.body.appendChild(script);
  }
}

/**
 * 获取ie版本
 * @return {number}
 */
function getIEVersion() {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion === 7) {
      return 7;
    } else if (fIEVersion === 8) {
      return 8;
    } else if (fIEVersion === 9) {
      return 9;
    } else if (fIEVersion === 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  } else if (isEdge) {
    return 0; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1;//不是ie浏览器
  }
}

export default load;
