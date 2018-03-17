import bookmarkletCompiler from "./Compiler";

// const BABEL_OPTIONS = {
//   presets: ["es2015"],
//   minified: true,
//   comments: false,
// };

export default bookmarkletCompiler(
  `
(() => {
  let hasRun;
  const bookmarkletStudioUrl = "${window.location.origin}";
  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", bookmarkletStudioUrl);
  iframe.style.display = "none";

  // Create IE + others compatible event handler
  const eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  const eventer = window[eventMethod];
  const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(
    messageEvent,
    function(event) {
      if (hasRun) return;
      try {
        eval(event.data);
        hasRun = true;
      } catch (err) {
        console.error(err);
      }
      document.body.removeChild(iframe);
    },
    false
  );

  document.body.appendChild(iframe);
})()
`
);
