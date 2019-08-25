import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  visibility: visible;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  & svg circle {
    stroke: #fff;
  }
`;

const Loading = () => (
  <Overlay>
    <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#555" strokeWidth="5" r="30" strokeDasharray="141.37166941154067 49.12388980384689" transform="rotate(60 50 50)">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
      </circle>
    </svg>
  </Overlay>
);

export default Loading;
