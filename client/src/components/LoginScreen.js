import { useState } from "react";
import styled from "styled-components";
import Container from "./Container";
import ContentContainer from "./ContentContainer";
import Header from "./Header";
import Input from "./Input";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user";
import { endpoint } from "../endpoint";

const LoginHeader = styled.h3`
  color: #fff;
`;

const Info = styled.p`
  font-size: 12px;
  color: #d3d3d3;
  margin-top: 5px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Submit = styled.button`
  height: auto;
  padding: 13px;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  margin: 15px 0;
  border: none;
  cursor: pointer;
`;

const Error = styled.p`
  margin-top: 20px;
`;

export default function LoginScreen({ getUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const user = await axios.post(`${endpoint}/user/login`, {
      username,
      password,
    });
    if (user.data.text) {
      setIsSubmitting(false);
      setError(user.data.text);
    } else {
      setIsSubmitting(false);
      getUser(user.data);
      dispatch(setUser(user.data));
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/homepage");
    }
  };
  return (
    <Container>
      <Header />
      <ContentContainer
        css={`
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          align-items: flex-start;
          width: 50%;
          @media only screen and (max-width: 600px) {
            align-items: center;
            padding: 0 20px;
          }
        `}
      >
        <LoginHeader>Login to answer question</LoginHeader>
        <Info>Only admin can login for now :)</Info>
        {error && <Error>{error}</Error>}
        <LoginForm onSubmit={handleSubmit}>
          <Input
            id="username"
            type="text"
            label="Username"
            placeholder="Please enter your username"
            onChange={handleUsernameChange}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Please enter your password"
            onChange={handlePasswordChange}
            required
          />
          <Submit onSubmit={handleSubmit} type="submit">
            {isSubmitting ? "Loading..." : "Login"}
          </Submit>
        </LoginForm>
      </ContentContainer>
    </Container>
  );
}
