import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { InsertEmoticon, Mic } from "@material-ui/icons";
import firebase from "firebase";
import TimeAgo from "timeago-react";

interface Props {
  chat: {
    id: string;
    users: [string, string];
  };
  messages: string[] | string;
}

const ChatScreen: FC<Props> = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  const [input, setInput] = useState("");
  const router = useRouter();
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
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
    } else {
      return JSON.parse(messages as string).map((message) => {
        <Message key={message.id} user={message.user} message={message} />;
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats")
      .doc(router.query.id as string)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoUrl: user.photoURL,
      });

    setInput("");
  };
  const recipient = recipientSnapshot?.docs?.[0].data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <div>
            <h3>{recipientEmail}</h3>
            {recipientSnapshot ? (
              <p>
                Last active :{" "}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : (
                  "Unavailable"
                )}{" "}
              </p>
            ) : (
              <p>Loading last</p>
            )}
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
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        ></button>
        <Mic />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  position: sticky;
  background-color: black;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
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

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

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
  display: flex;
  align-items: center;
  padding: 10px;
  position: absolute;
  width: 100%;
  background-color: black;
  bottom: 0;
  z-index: 100;
`;
