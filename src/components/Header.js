import React from "react";
import styled from "styled-components";
import BookmarkletButton from "./BookmarkletButton";
import DevBookmarkletCode from "../lib/DevBookmarkletCode";
import NameInput from "./NameInput";
import CopyCodeButton from "./CopyCodeButton";

const HeaderView = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #1d1d1b;
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

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default ({ code, bookmarkletText, handleNameChange }) => {
  return (
    <HeaderView>
      <div>
        <HeaderLogo>BIDE</HeaderLogo>
        <NameInput
          bookmarkletText={bookmarkletText}
          handleNameChange={handleNameChange}
          placeholder="Untitled Bookmarklet"
        />
      </div>
      <Buttons>
        <CopyCodeButton name={bookmarkletText} code={code} />
        <BookmarkletButton href={code} beforeText="Production Bookmarklet">
          <span>{bookmarkletText || "Production Bookmarklet"}</span>
        </BookmarkletButton>
        <BookmarkletButton
          href={DevBookmarkletCode}
          beforeText="Dev Bookmarklet"
        >
          <span>Dev Bookmarklet</span>
        </BookmarkletButton>
      </Buttons>
    </HeaderView>
  );
};
