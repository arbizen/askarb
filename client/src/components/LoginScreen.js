import { useContext, useState } from "react";
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
import { showToast } from "../redux/reducers/toast";
import { ThemeContext } from "../context";

const LoginHeader = styled.h3`
  color: ${(props) => props.color};
`;

const Info = styled.p`
  font-size: 12px;
  color: ${(props) => props.color};
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
  color: ${(props) => props.color};
  background: ${(props) => props.bg};
  margin: 15px 0;
  border: none;
  cursor: pointer;
  box-shadow: 0 1.5px 3.5px rgba(0, 0, 0, 0.12);
`;

const Error = styled.p`
  margin-top: 20px;
  color: ${(props) => props.color};
`;

export default function LoginScreen() {
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
      dispatch(setUser(user.data));
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(showToast("Logged in successfully."));
      history.push("/homepage");
    }
  };
  const { login, text } = useContext(ThemeContext);
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
        <LoginHeader color={login.text}>Login to answer question</LoginHeader>
        <Info color={login.textSecondary}>Only admin can login for now :)</Info>
        {error && <Error color={text}>{error}</Error>}
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
          <Submit
            color={login.buttonText}
            bg={login.button}
            onSubmit={handleSubmit}
            type="submit"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Submit>
        </LoginForm>
      </ContentContainer>
    </Container>
  );
}
