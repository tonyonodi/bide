import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const floatup = keyframes`
  20% {
    opacity: 0.999;
  }
  100% {
    transform: translate3d(0, -17px, 0);
  }
`;

const Parent = styled.div`
  position: relative;
  margin-top: 12px;
  margin-right: 10px;
  position: relative;
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:before {
    content: "Copy Code";
  }
  &:after {
    content: attr(data-copy-message);
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0.001;
    text-align: center;
    ${({ showCopiedMessage }) =>
      showCopiedMessage ? `animation: ${floatup} 0.5s ease-in-out;` : ""};
  }
`;

const Name = styled.span`
  display: none;
`;

const Code = styled.input`
  position: absolute;
  left: 0;
  z-index: -1;
`;

export default class CopyCodeButton extends Component {
  state = { showCopiedMessage: false };

  shouldComponentUpdate(nextProps, nextState) {
    const codeChanged = nextProps.code !== this.props.code;
    const nameChanged = nextProps.name !== this.props.name;
    const stateChanged = this.state !== nextState;
    return codeChanged || nameChanged || stateChanged;
  }

  handleClick = () => {
    this.codeElement.select();
    document.execCommand("copy");

    this.setState({ showCopiedMessage: true });
    setTimeout(() => this.setState({ showCopiedMessage: false }), 500);
  };

  render() {
    const { code, name } = this.props;
    const { showCopiedMessage } = this.state;
    const buttonCode = `<a href="${encodeURI(code)}">${name}</a>`;

    return (
      <Parent
        onClick={this.handleClick}
        showCopiedMessage={showCopiedMessage}
        data-copy-message="Copied"
      >
        <Name>{name}</Name>
        <Code
          innerRef={el => (this.codeElement = el)}
          value={buttonCode}
          readOnly
        />
      </Parent>
    );
  }
}
