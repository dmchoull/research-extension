import React from "react";
import styled from "react-emotion";

const Container = styled("div")`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingIndicator = () => <Container>Loading…</Container>;

export default LoadingIndicator;
