import React, { Component } from "react";
import styled from "react-emotion";
import ResultData from "../../common/resultData";
import { Messages, SearchMessage } from "../../common/messages";
import SearchResults from "./SearchResults";
import Source from "../../common/source";
import LoadingIndicator from "./LoadingIndicator";

const SOURCES = [Source.YOUTUBE, Source.GOOGLE];

const Content = styled("div")`
  width: 600px;
  height: 800px;
  padding: 20px;
`;

const Header = styled("div")`
  width: 100%;
  text-align: center;
`;

interface State {
  source: Source;
  results: ResultData[];
}

export default class Popup extends Component<{}, State> {
  state = { source: Source.YOUTUBE, results: [] as ResultData[] };

  componentDidMount() {
    this.youtubeSearch();
  }

  private youtubeSearch() {
    chrome.tabs.query({ active: true, currentWindow: true }, result => {
      const message: SearchMessage = { type: Messages.SEARCH, tab: result[0] };

      chrome.runtime.sendMessage(message, (response: { data: ResultData[] }) => {
        this.setState({ results: response.data });
      });
    });
  }

  private isLoading() {
    const { results } = this.state;
    return results.length === 0;
  }

  public render() {
    const { source, results } = this.state;

    return (
      <Content>
        <Header>
          <select name="source" id="source" value={source} onChange={() => {}}>
            {SOURCES.map(s => (
              <option key={s.toLowerCase()} value={s.toLowerCase()}>
                {s}
              </option>
            ))}
          </select>
        </Header>

        {this.isLoading() ? LoadingIndicator() : <SearchResults results={results} />}
      </Content>
    );
  }
}
