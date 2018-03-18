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

export default ({ code, bookmarkletText }) => (
  <HeaderView>
    <HeaderLogo>BIDE</HeaderLogo>
    <BookmarkletButton code={DevBookmarkletCode} text="Dev Bookmarklet" />
    <BookmarkletButton code={code} text={bookmarkletText} editable />
  </HeaderView>
);
