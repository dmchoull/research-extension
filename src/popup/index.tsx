import React from "react";
import { render } from "react-dom";
import Popup from "./components/Popup";

const rootElement = document.createElement("div");
rootElement.id = "test-extension-root";
document.body.insertBefore(rootElement, document.body.childNodes[0]);

render(<Popup />, rootElement);
