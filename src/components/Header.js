import React from "react";
import styled from "styled-components";
import BookmarkletButton from "./BookmarkletButton";
import DevBookmarkletCode from "../lib/DevBookmarkletCode";

const HeaderView = styled.div`
  background-color: #1d1d1b;
  height: 60px;
  padding: 10px 20px;
  color: white;
`;

const HeaderLogo = styled.h1`
  display: inline-block;
  margin: 0;
  font-family: "Inconsolata", monospace;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  font-size: 2rem;
  background: white;
  color: #1d1d1b;
  padding: 0px 5px;
  border-radius: 7px;
  margin-top: 4px;
`;

const BookmarkletTextInput = styled.input`
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
`;

export default ({ code, bookmarkletText, handleNameChange }) => {
  return (
    <HeaderView>
      <HeaderLogo>BIDE</HeaderLogo>
      <BookmarkletTextInput
        value={bookmarkletText}
        placeholder="Untitled Bookmarklet"
        hasName={Boolean(bookmarkletText)}
        onChange={e => handleNameChange(e.target.value)}
      />
      <BookmarkletButton href={DevBookmarkletCode} beforeText="Dev Bookmarklet">
        <span>Dev Bookmarklet</span>
      </BookmarkletButton>
      <BookmarkletButton href={code} beforeText="Production Bookmarklet">
        <span>{bookmarkletText}</span>
      </BookmarkletButton>
    </HeaderView>
  );
};
