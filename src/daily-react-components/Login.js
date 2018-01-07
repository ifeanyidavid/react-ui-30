import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import Background from "./darth-vader.jpg";
import "./login.css";

injectGlobal`
    body{
        font-family: "Roboto", sans-serif;
    }
    .foot-note-text{
        color: red;
        margin-left: 20px;

        &:first-of-type{
            margin-left: 0;
        }
    }
    .form-label{
        display: block;
        color: #ccc;
        text-transform: uppercase;
        margin-top: 16px;

        &:first-of-type{
            margin-top: 0;
        }
    }
`;

const Container = styled.div`
  background: #333;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpWrapper = styled.div`
  background: #fff;
  width: 60%;
  height: 75%;
  display: flex;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.32);
`;

const RightCol = styled.div`
  width: 50%;
  height: 100%;
`;

const LeftCol = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageContainer = styled.div`
  background: url(${Background}) no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 80px;
`;

const Logo = styled.h3`
  color: #fff;
  font-size: 20px;
`;

const Text = styled.h1`
  margin-top: 25%;
  color: #fff;
  font-size: 32px;
  font-weight: 100;
`;

const FootNotes = styled.footer`
  display: flex;
  margin-top: 80%;
`;

const FormContainer = styled.div`
  background: #fff;
  width: 300px;
`;

const Input = styled.input`
  padding: 0.5em;
  padding-left: 0;
  margin: 0.5em;
  margin-left: 0;
  color: #333;
  border: none;
  display: block;
  border-bottom: 2px solid #dbdbdb;
  background: none;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 50px;
  background: red;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  margin-top: 50px;
`;

const SigninLink = styled.a`
  color: #333;
  margin-left: 20px;
  text-decoration: underline;
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <Container>
        <SignUpWrapper>
          <RightCol>
            <ImageContainer>
              <Overlay />
              <TextContainer>
                <Logo>Empire</Logo>
                <Text>
                  Join the dark side. <br />We have cookies.
                </Text>
                <FootNotes>
                  <span className="foot-note-text">About</span>
                  <span className="foot-note-text">Imprint</span>
                  <span className="foot-note-text">Contact</span>
                </FootNotes>
              </TextContainer>
            </ImageContainer>
          </RightCol>
          <LeftCol>
            <FormContainer>
              <form>
                <label className="form-label">Username</label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  className="form-input"
                />
                <label className="form-label">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-input"
                />
                <label className="form-label">Password</label>
                <Input
                  type="password"
                  name="password1"
                  value={this.state.password1}
                  onChange={this.handleChange}
                  className="form-input"
                />
                <label className="form-label">Retype password</label>
                <Input
                  type="password"
                  name="password2"
                  value={this.state.password1}
                  onChange={this.handleChange}
                  className="form-input"
                />
                <Button>Sign up now</Button>
                <SigninLink>I am already a member?</SigninLink>
              </form>
            </FormContainer>
          </LeftCol>
        </SignUpWrapper>
      </Container>
    );
  }
}
