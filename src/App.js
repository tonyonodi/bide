import React, { Component } from "react";
import "./App.css";
import Codemirror from "react-codemirror";
import Header from "./components/Header";
import CompileBookmarklet from "./lib/Compiler";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/icecoder.css";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/matchtags.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/search.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/comment/comment.js";

const CODEMIRROR_OPTIONS = {
  mode: "javascript",
  theme: "icecoder",
  keyMap: "sublime",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  undoDepth: Infinity,
};

class App extends Component {
  constructor(props, content) {
    super(props, content);
    const code = localStorage.getItem("BS_code") || "";
    const compiledCode = this.compileCode(code);

    // Pass compiled code to parent if in iframe so that dev
    // bookmarklet can retrieve code on other domains.
    console.log(compiledCode);
    window.parent.postMessage(compiledCode, "*");

    this.state = {
      code,
      bookmarkletText: "Production Bookmarklet",
      compiledCode,
    };
  }

  compileCode = CompileBookmarklet;

  handleChange = code => {
    this.setState({ code });
    this.setState({ compiledCode: this.compileCode(code) });
    localStorage.setItem("BS_code", code);
  };

  render() {
    return (
      <div className="App">
        <Header
          code={this.state.compiledCode}
          bookmarkletText={this.state.bookmarkletText}
        />
        <Codemirror
          value={this.state.code}
          onChange={this.handleChange}
          options={CODEMIRROR_OPTIONS}
        />
        <div id="code-silo" style={{ display: "none" }}>
          {this.state.compiledCode}
        </div>
      </div>
    );
  }
}

export default App;
