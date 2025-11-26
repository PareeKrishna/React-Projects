import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Click me to visit google.com",
};

const AnotherElement = (
  <a href="https://google.com" target="_blank">
    {" "}
    Visit Google{" "}
  </a>
);

function MyApp() {
  return (
    <div>
      <h1> Custom React App</h1>
    </div>
  );
}

const arectElement = React.createElement(
  "a",
  { href: "https://google.com", target: "_blank" },
  "Click me to visit google.com"
);
createRoot(document.getElementById("root")).render(arectElement);
