import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Layout } from "zent";

const { Col } = Layout;

const card = props => {
  const { title, value, redirect, width } = props;
  return (
    <Col span={width}>
      <CardHolder>
        <span>{title}</span>
        <h2>{value}</h2>
        {redirect && (
          <div>
            <Link to={redirect}>{title}</Link>
          </div>
        )}
      </CardHolder>
    </Col>
  );
};

const CardHolder = styled.div`
  margin: 10px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 6px 20px 0 rgba(109, 109, 109, 0.1);
  span {
    font-size: 14px;
    font-weight: bold;
    color: #222;
  }
  h2 {
    text-align: center;
    font-size: 3em;
    color: #222;
    margin: 20px 0;
  }
  div {
    text-align: right;
  }
  a {
    color: #e30917;
    display: inline-block;
    border-radius: 15px;
    font-size: 13px;
    padding: 5px 15px;
    box-shadow: 0px 2px 20px 0 rgba(109, 109, 109, 0.18);
  }
`;

card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  redirect: PropTypes.string
};

export default card;
