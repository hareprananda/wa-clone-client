import { Avatar, Button, IconButton } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";

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
  padding: 5px 0px;
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

const Sidebar: FC = () => {
  return (
    <Container>
      <Header>
        <UserAvatar />

        <IconsContainer>
          <IconButton color="inherit">
            <ChatIcon color="inherit" />
          </IconButton>
          <IconButton color="inherit">
            <MoreVertIcon color="inherit" />
          </IconButton>
        </IconsContainer>
      </Header>
    </Container>
  );
};

export default Sidebar;
