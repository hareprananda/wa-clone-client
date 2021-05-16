import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";

interface Props {
  chat: {
    id: string;
    users: [string, string];
  };
  messages: string[];
}

const ChatScreen: FC<Props> = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>{getRecipientEmail(chat.users, user)}</h3>
          <p>Last seen ...</p>

          <HeaderIcons>
            <IconButton color="inherit">
              <AttachFileIcon color="inherit" />
            </IconButton>
            <IconButton color="inherit">
              <MoreVertIcon color="inherit" />
            </IconButton>
          </HeaderIcons>
        </HeaderInformation>
      </Header>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div``;

const HeaderInformation = styled.div``;

const HeaderIcons = styled.div`
  color: white;
`;
