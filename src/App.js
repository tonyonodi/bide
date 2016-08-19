import React, { Component } from 'react';
import './App.css';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/icecoder.css';
import * as Babel from 'babel-standalone';

const DEFAULT_ERROR_CODE = `alert("Your bookmarklet has compilation errors.")`;

const BABEL_OPTIONS = {
  presets: ['es2015'],
  minified: true,
  comments: false,
};

const CODEMIRROR_OPTIONS = {
  lineNumbers: true,
  mode: "javascript",
  theme: "icecoder",
};

const DEV_BOOKMARKLET_HREF=`javascript:(function(){"use strict";var bookmarkletStudioUrl="http://localhost:3002";var iframe=document.createElement("iframe");iframe.setAttribute("src",bookmarkletStudioUrl);iframe.style.display="none";var eventMethod=window.addEventListener?"addEventListener":"attachEvent";var eventer=window[eventMethod];var messageEvent=eventMethod=="attachEvent"?"onmessage":"message";eventer(messageEvent,function(event){try{eval(event.data)}catch(err){console.error(err)}document.body.removeChild(iframe)},false);document.body.appendChild(iframe);})()`;

class BookmarkletButton extends Component {
  render() {
    return (
      <a href={this.props.code} className="bookmarklet">
        {this.props.bookmarkletText}
      </a>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <h1>Bookmarklet Studio</h1>
        <BookmarkletButton 
          code={DEV_BOOKMARKLET_HREF}
          bookmarkletText="Dev Bookmarklet" />
        <BookmarkletButton 
          code={this.props.code}
          bookmarkletText={this.props.bookmarkletText} />
      </div>
    );
  }
}

class App extends Component {
  constructor(props, content) {
    super(props, content);
    const code = localStorage.getItem("BS_code") || "";
    const compiledCode = this.compileCode(code);

    // Pass compiled code to parent if in iframe so that dev
    // bookmarklet can retrieve code on other domains.
    parent.postMessage(compiledCode, "*");

    this.state = {
      code,
      bookmarkletText: "Production Bookmarklet",
      compiledCode,
    };
  }

  compileCode = (code) => {
    let compiledCode;
    try {
      compiledCode = Babel.transform(code, BABEL_OPTIONS).code;
    } catch(e) {
      console.error(e);
      compiledCode = DEFAULT_ERROR_CODE;
    }
    return `javascript:(function(){${compiledCode}})()`;
  }

  handleChange = (code) => {
    this.setState({ code });
    this.setState({ compiledCode: this.compileCode(code) });
    localStorage.setItem("BS_code", code);
  }

  render() {
    return (
      <div className="App">
        <Header 
          code={this.state.compiledCode}
          bookmarkletText={this.state.bookmarkletText} />
        <Codemirror
          value={this.state.code}
          onChange={this.handleChange}
          options={CODEMIRROR_OPTIONS} />
        <div 
          id="code-silo" 
          style={{display: "none"}}>
          {this.state.compiledCode}
        </div>
      </div>
    );
  }
}

export default App;
