import React from "react";
import styled from "styled-components";

const BookmarkletTextInputContainer = styled.div`
  display: inline-block;
  margin-left: 20px;
  position: relative;
`;

const HiddenDiv = styled.div`
  visibility: hidden;
  font-size: 1.5em;
`;

const BookmarkletTextInput = styled.input`
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  position: absolute;
  top: 0;

  &:focus {
    outline: none;
  }
  &:after {
    content: "hello";
    color: white;
  }
  &:focus + div {
    width: 100%;
  }
`;

const BookmarkletTextInputUnderline = styled.div`
  background: white;
  width: 0;
  height: 2px;
  margin: 0 auto;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;

export default ({ bookmarkletText, handleNameChange, placeholder }) => {
  return (
    <BookmarkletTextInputContainer>
      <HiddenDiv>{bookmarkletText || placeholder}</HiddenDiv>
      <BookmarkletTextInput
        value={bookmarkletText}
        placeholder={placeholder}
        hasName={Boolean(bookmarkletText)}
        onChange={e => handleNameChange(e.target.value)}
      />
      <BookmarkletTextInputUnderline className="underline" />
    </BookmarkletTextInputContainer>
  );
};
