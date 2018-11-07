import React from "react";
import styled from "react-emotion";
import ResultData from "../../common/resultData";
import SearchResult from "./SearchResult";

const Results = styled("ul")`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding-top: 20px;
  }
`;

interface SearchResultsProps {
  results: ResultData[];
}

const SearchResults: React.SFC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  } else {
    return (
      <Results>
        {results.map(result => (
          <li key={result.id}>
            <SearchResult {...result} />
          </li>
        ))}
      </Results>
    );
  }
};

export default SearchResults;
