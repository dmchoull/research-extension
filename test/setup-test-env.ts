import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import fetch from "jest-fetch-mock";

window.fetch = fetch;
