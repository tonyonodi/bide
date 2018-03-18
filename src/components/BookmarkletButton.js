import React from "react";
import styled from "styled-components"

const BookmarkletView = styled.a`
  color: #fff;
  font-family: 'Inconsolata', monospace;  
  text-decoration: none;
  background: #c35050;
  padding: 8px;
  float: right;
  margin: 4px 5px;
  border-radius: 5px;
`

const EditIcon = styled.img`
  display: inline;
`

export default ({ code, text, editable }) => (
  <BookmarkletView href={code} className="bookmarklet">
    <span>{text}</span> {editable ? <img src="/pen-square.svg" /> : null}
  </BookmarkletView>
);
