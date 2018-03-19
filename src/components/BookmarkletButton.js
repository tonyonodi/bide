import React, { Component } from "react";
import styled from "styled-components";

const BookmarkletView = styled.a`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ editable }) => (editable ? "8px" : 0)};
  color: #fff;
  font-family: "Inconsolata", monospace;
  text-decoration: none;
  background: #c35050;
  padding: 8px;
  float: right;
  margin: 4px 5px;
  border-radius: 5px;
  min-height: 37px;
`;

const BookmarkletName = styled.span`
  margin: auto;
`;

const BookmarkletInput = styled.input`
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  outline: none;
  width: 176px;
`;

const EditIconSVG = styled.svg`
  height: 18px;
  fill: white;
`;

const PencilIcon = () => {
  return (
    <EditIconSVG xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 512 512`}>
      <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" />
    </EditIconSVG>
  );
};

const TickIcon = () => {
  return (
    <EditIconSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </EditIconSVG>
  );
};

export default class BookmarkletButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.text,
      draftName: null,
      code: props.code,
    };
  }

  submit = () => {
    this.setState({
      name: this.state.draftName,
      draftName: null,
    });
    localStorage.setItem("BS_name", this.state.draftName);
  };

  handleKeyPress = event => {
    const { key } = event;
    if (key === "Enter") {
      this.submit();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.code !== this.state.code) {
      this.setState({ code: nextProps.code });
    }
  }

  handleChange = e => {
    this.setState({ draftName: e.target.value });
  };

  handleClick = e => {
    if (this.state.draftName !== null) e.preventDefault();
  };

  handleBlur = _e => {
    console.log("handling blur");
    this.setState({ draftName: null });
  };

  handleEditClick = e => {
    e.preventDefault();
    if (this.state.draftName === null) {
      this.setState({
        draftName: this.state.name,
      });
    } else {
      this.submit();
    }
  };

  render() {
    return (
      <BookmarkletView href={this.state.code} editable={this.props.editable}>
        {this.state.draftName !== null ? (
          <BookmarkletInput
            onChange={this.handleChange}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            value={this.state.draftName}
            onKeyPress={this.handleKeyPress}
            autofocus
            innerRef={input => {
              this.inputRef = input;
              // This is a lazy hack to focus this element when it appears
              // without having to break it out into its own component and
              // use componentDidMount.
              if (!input) return;
              if (document.activeElement !== input) {
                input.focus();
                input.select();
              }
            }}
          />
        ) : (
          <BookmarkletName>{this.state.name}</BookmarkletName>
        )}
        {this.props.editable ? (
          <span onClick={this.handleEditClick}>
            {this.state.draftName ? <TickIcon /> : <PencilIcon />}
          </span>
        ) : null}
      </BookmarkletView>
    );
  }
}
