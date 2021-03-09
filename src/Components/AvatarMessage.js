import React from "react";
import styled from "styled-components";
import { Character } from "../Components";

const AvatarMessage = ({ src, alt, className }) => {
  return (
    <Container className={className}>
      <Character className="avatar" src={src} alt={alt} style={styles.avatar} />
    </Container>
  );
};

export default AvatarMessage;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

const styles = {
  avatar: {
    height: "20vw",
  },
};
