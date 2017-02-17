import React from "react";
import BookmarkletButton from "./BookmarkletButton";

const DEV_BOOKMARKLET_HREF = `javascript:(function(){"use strict";var bookmarkletStudioUrl="http://0.0.0.0:3000";var iframe=document.createElement("iframe");iframe.setAttribute("src",bookmarkletStudioUrl);iframe.style.display="none";var eventMethod=window.addEventListener?"addEventListener":"attachEvent";var eventer=window[eventMethod];var messageEvent=eventMethod=="attachEvent"?"onmessage":"message";eventer(messageEvent,function(event){try{eval(event.data)}catch(err){console.error(err)}document.body.removeChild(iframe)},false);document.body.appendChild(iframe);})()`;

export default ({ code, bookmarkletText }) => <div className="App-header">
  <h1>BIDE</h1>
  <BookmarkletButton code={DEV_BOOKMARKLET_HREF} text="Dev Bookmarklet" />
  <BookmarkletButton code={code} text={bookmarkletText} />
</div>
