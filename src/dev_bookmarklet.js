const bookmarkletStudioUrl = "http://0.0.0.0:3000";
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
    try {
      eval(event.data);
    } catch (err) {
      console.error(err);
    }
    document.body.removeChild(iframe);
  },
  false
);

document.body.appendChild(iframe);
