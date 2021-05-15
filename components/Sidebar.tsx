import { Avatar, Button, IconButton } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import { auth } from "../firebase";
import * as EmailValidator from "email-validator";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

const Sidebar: FC = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatSnapshot] = useCollection(userChatRef);
  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with!"
    );
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !chatAlreadyExist(input)
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };
  const chatAlreadyExist = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          <IconButton color="inherit">
            <ChatIcon color="inherit" />
          </IconButton>
          <IconButton color="inherit">
            <MoreVertIcon color="inherit" />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon color="inherit" />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>start a new chat</SidebarButton>
      {/* List of chat */}
      {chatSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  background-color: black;
  justify-content: space-between;
  z-index: 1;
  align-items: center;
  padding: 15px;
  height: 80px;
`;

const SearchInput = styled.input`
  :focus {
    outline: none;
  }
  outline-width: 0;
  border: 1px solid #808080;
  border-radius: 5px;
  background-color: transparent;
  flex: 1;
  padding: 5px 3px;
  color: white;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  color: white;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SidebarButton = styled(({ color, ...otherprops }) => (
  <Button color="inherit" {...otherprops} />
))`
  width: 100%;
  color: white;
  text-transform: uppercase;
`;
