import React from "react";
import { css } from "emotion";
import styled from "react-emotion";
import ResultData from "../../common/resultData";

const container = css({
  width: "100%",
  display: "flex",
});

const Left = styled("div")``;

const Right = styled("div")`
  padding-left: 20px;
`;

interface LinkProps {
  id: string;
}

const Link: React.SFC<LinkProps> = ({ children, id }) => (
  <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
);

const SearchResult: React.SFC<ResultData> = ({ id, title, thumbnail, viewCount, length }) => (
  <div className={container}>
    <Left>
      <Link id={id}>
        <img src={thumbnail.url} width={200} />
      </Link>
    </Left>

    <Right>
      <Link id={id}>
        {title} ({length})
      </Link>

      <p>{viewCount}</p>
    </Right>
  </div>
);

export default SearchResult;
