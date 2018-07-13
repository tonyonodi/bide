import styled from "styled-components";

export default styled.a`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 0;
  color: #c35050;
  font-family: "Inconsolata", monospace;
  text-decoration: none;
  background: #c35050;
  padding: 8px;
  float: right;
  margin: 4px 5px;
  border-radius: 5px;
  min-height: 37px;
  &:before {
    content: "${({ beforeText }) => beforeText}";
    color: white;
  }
  span {
    display: none;
  }
`;
