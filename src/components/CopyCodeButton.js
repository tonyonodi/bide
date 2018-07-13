import React, { Component } from "react";
import styled from "styled-components";

const Link = styled.div`
  float: right;
  margin-top: 12px;
  margin-right: 10px;
  position: relative;
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:before {
    content: "Copy Code";
  }
  & span {
    display: none;
  }
`;

const Code = styled.input`
  position: absolute;
  left: 0;
  z-index: -1;
`;

export default class CopyCodeButton extends Component {
  shouldComponentUpdate(nextProps, _nextState) {
    const codeChanged = nextProps.code !== this.props.code;
    const nameChanged = nextProps.name !== this.props.name;
    return codeChanged || nameChanged;
  }

  handleClick = () => {
    this.codeElement.select();
    document.execCommand("copy");
  };

  render() {
    const { code, name } = this.props;
    const buttonCode = `<a href="${encodeURI(code)}">${name}</a>`;

    return (
      <Link onClick={this.handleClick}>
        <span>{name}</span>
        <Code
          innerRef={el => (this.codeElement = el)}
          value={buttonCode}
          readOnly
        />
      </Link>
    );
  }
}
