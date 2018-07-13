import React from "react";
import styled from "styled-components";
import { backgroundGrey } from "../global_styles";

const FooterView = styled.footer`
  background: ${backgroundGrey};
  color: white;
  text-align: center;
  padding: 5px;
  font-size: 0.9em;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  font-style: italic;
`;

export default () => {
  return (
    <FooterView>
      Created by{" "}
      <Link href="https://twitter.com/tonyonodi" target="_blank">
        Tony Onodi
      </Link>.
    </FooterView>
  );
};
