import React from "react";
import styled from "styled-components";

const ContainerStyles = styled.div`
  height: 42px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  border: 0.1em solid rgb(199, 199, 199);
`;

const FillerStyles = styled.div`
  height: 100%;
  width: ${(props) => (props.completed > 100 ? "100%" : props.completed + "%")};
  background-color: ${(props) => (props.completed > 100 ? "red" : "lightblue")};
  text-align: center;
  z-index: -1;
  transition: width 1s;
`;

const LableStyles = styled.div`
  color: black;
  text-align: center;
  position: absolute;
  top: 15%;
  left: 45%;
  z-index: 3;
  font-size: 18px;
  font-family: "STIX Two Text", serif;
`;

const ProgressBar = ({ props }) => {
  return (
    <ContainerStyles>
      <LableStyles data-testid={`progressbar_indicator_${props.id}`}>
        {`${props.completed}%`}
      </LableStyles>
      <FillerStyles
        completed={props.completed}
        id={`filler_${props.id}`}
        data-testid={`progressbar_${props.id}`}
      />
    </ContainerStyles>
  );
};

export default ProgressBar;
