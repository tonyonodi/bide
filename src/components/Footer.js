import React, { Component } from "react";
import styled from "styled-components";
import { backgroundGrey } from "../global_styles";

const FooterView = styled.footer`
  background: ${backgroundGrey};
  color: #8e8e8e;
  padding: 5px 10px;
  font-size: 0.9em;
  text-align: center;
`;

const Text = styled.span`
  display: inline-block;
  vertical-align: top;
  padding-top: 2px;
  padding-right: 5px;
  margin-bottom: 7px;
`;

const Link = styled.a`
  color: inherit;
`;

export default class Footer extends Component {
  render() {
    return (
      <FooterView>
        <Text>
          Created by{" "}
          <Link href="http://twitter.com/tonyonodi" target="_blank">
            Tony Onodi
          </Link>
        </Text>
      </FooterView>
    );
  }
}
