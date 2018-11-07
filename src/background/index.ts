import searchYoutube from "./search/youtube";
import ResultData from "../common/resultData";
import { Messages } from "../common/messages";

chrome.runtime.onMessage.addListener(({ type, tab }, sender, sendResponse) => {
  if (type !== Messages.SEARCH) {
    console.log("invalid request");
    return;
  }

  const query = tab.title.replace(" - Amazon Canada", "");

  searchYoutube(query).then((data: ResultData[]) => {
    sendResponse({ data });
  });

  return true;
});
