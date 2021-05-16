import React, { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { GetServerSideProps } from "next";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  chat: {
    id: string;
    users: [string, string];
  };
  messages: string[];
}

const Chat: FC<Props> = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>

      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ref = db.collection("chats").doc(context.query.id as string);

  //prep the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // prep the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  console.log(chat, messages);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
};
const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
