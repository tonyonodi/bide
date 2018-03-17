import React from "react";
import BookmarkletButton from "./BookmarkletButton";
import DevBookmarkletCode from "../lib/DevBookmarkletCode";

export default ({ code, bookmarkletText }) => (
  <div className="App-header">
    <h1>BIDE</h1>
    <BookmarkletButton code={DevBookmarkletCode} text="Dev Bookmarklet" />
    <BookmarkletButton code={code} text={bookmarkletText} />
  </div>
);
