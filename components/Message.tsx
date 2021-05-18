import styled from "styled-components";
import React, { FC } from "react";

interface Props {
  message: any;
  user: any;
}
const Message: FC<Props> = ({ message, user }) => {
  return <Container>{message.message}</Container>;
};

export default Message;

const Container = styled.div``;
