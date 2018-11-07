import Tab = chrome.tabs.Tab;

export enum Messages {
  SEARCH,
}

export interface SearchMessage {
  type: Messages.SEARCH;
  tab: Tab;
}
