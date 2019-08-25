import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Layout } from "zent";

const { Col } = Layout;

const card = props => {
  const { title, value } = props;
  return (
    <Col span={8}>
      <CardHolder>
        <span>{title}</span>
        <h2>{value}</h2>
      </CardHolder>
    </Col>
  );
};

const CardHolder = styled.div`
  margin: 10px;
  padding: 20px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #ddd;
  text-align: center;
  transform: translate(0, 0);
  transition: all 0.3s ease;
  :hover {
    box-shadow: 0px 6px 20px 0 rgba(0, 0, 0, 0.12);
    border-color: #c5c5c5;
    transform: translate(0, -3px);
    transition: all 0.3s ease;
  }
  span {
    font-size: 14px;
    font-weight: bold;
    color: #222;
    display: block;
  }
  h2 {
    font-size: 1.8em;
    color: #222;
    margin: 20px 0;
  }
`;

card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default card;
