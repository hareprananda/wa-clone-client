import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { InsertEmoticon, Mic } from "@material-ui/icons";

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
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id as string)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <div>
            <h3>{getRecipientEmail(chat.users, user)}</h3>
            <p>Last seen ...</p>
          </div>

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

      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input />
        <Mic />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: black;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  h3 {
    margin-bottom: 3px;
  }
  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const HeaderIcons = styled.div`
  color: white;
`;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div``;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  bacground-color: whitesmoke;
  padding: 15px;
  margin-left: 15px;
  margin-right: 15px;
`;
const InputContainer = styled.form`
display  : flex;
align-items : center;
padding : 10px;
position : sticky;
bottom : 0;
background-color : white
z-index  : 100`;
