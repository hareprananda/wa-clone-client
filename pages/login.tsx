import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
const login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title> Login</title>
      </Head>
      <LoginContainer>
        <Logo src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png" />
        <Button onClick={signIn} color="inherit" variant="outlined">
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  background-color: #353535;
  border-radius: 5%;
  box-shadow: 0px 4px 14px -3px rgba(255, 255, 255, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
