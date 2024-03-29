import React, { Component } from "react";
import styled from "../node_modules/styled-components";
import Codemirror from "react-codemirror";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CompileBookmarklet from "./lib/Compiler";
import defaultCode from "./defaultCode";
import "./App.css";
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

const AppView = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  constructor(props, content) {
    super(props, content);
    const code = localStorage.getItem("BS_code") || defaultCode;
    const compiledCode = this.compileCode(code);

    // Pass compiled code to parent if in iframe so that dev
    // bookmarklet can retrieve code on other domains.
    window.parent.postMessage(compiledCode, "*");

    this.state = {
      code,
      bookmarkletText: localStorage.getItem("BS_name") || "",
      compiledCode,
    };
  }

  compileCode = CompileBookmarklet;

  handleNameChange = name => {
    this.setState({ bookmarkletText: name });
    localStorage.setItem("BS_name", name);
  };

  handleCodeChange = code => {
    this.setState({ code });
    this.setState({ compiledCode: this.compileCode(code) });
    localStorage.setItem("BS_code", code);
  };

  render() {
    return (
      <AppView className="App">
        <Header
          code={this.state.compiledCode}
          bookmarkletText={this.state.bookmarkletText}
          handleNameChange={this.handleNameChange}
        />
        <Codemirror
          value={this.state.code}
          onChange={this.handleCodeChange}
          options={CODEMIRROR_OPTIONS}
        />
        <Footer />
      </AppView>
    );
  }
}

export default App;
