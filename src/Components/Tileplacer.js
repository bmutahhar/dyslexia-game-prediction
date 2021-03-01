import React, { forwardRef } from "react";
import styled from "styled-components";

const Tileplacer = forwardRef(({ children, ...props }, ref) => {
  return (
    <TileplacerComponent ref={ref} {...props}>
      {children}
    </TileplacerComponent>
  );
});

export default Tileplacer;

const TileplacerComponent = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8vw;
  width: 8vw;
  background-color: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  border: 2px solid #c9c4c4;
  margin-left: 5px;
  margin-right: 5px;
  z-index: 1;
`;
