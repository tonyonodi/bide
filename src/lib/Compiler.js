import * as Babel from "babel-standalone";

const BABEL_OPTIONS = {
  presets: ["es2015"],
  minified: true,
  comments: false,
};

const DEFAULT_ERROR_CODE = `alert("Your bookmarklet has compilation errors.")`;

export default code => {
  let compiledCode;
  try {
    compiledCode = Babel.transform(code, BABEL_OPTIONS).code;
  } catch (e) {
    console.error(e);
    compiledCode = DEFAULT_ERROR_CODE;
  }
  return `javascript:(function(){${compiledCode}})()`;
};
