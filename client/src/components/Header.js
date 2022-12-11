import styled from "styled-components";
import { ThemeContext } from "../context";
import { useContext } from "react";
import IconButton from "./IconButton";
import { Moon, Sun, Menu, Home, LogIn, LogOut } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/reducers/user";
import { useHistory } from "react-router";
import { showToast } from "../redux/reducers/toast";

const Header = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.color};
  padding-top: 10px;
  font-size: 15px;
  align-items: center;
  color: lightgrey;
`;

const HeaderDiv = styled.div`
  display: flex;
  height: 100%;
  width: auto;
  min-height: 20px;
  padding: 10px 20px;
  justify-content: ${(props) => props.justify};
  align-items: center;
`;

const Title = styled.h1`
  color: #fff;
  display: flex;
  justify-content: center;
  word-spacing: 5px;
  align-items: center;
  font-size: 20px;
  margin-top: 30px;
`;

const HeaderExtend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhiteBg = styled.span`
  display: inline-block;
  height: auto;
  width: auto;
  border-radius: 0 5px 5px 0;
  padding: 1px 6px;
  background: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  color: ${(props) => props.text};
`;

const OnlyBorder = styled.span`
  display: inline-block;
  height: auto;
  width: auto;
  border-radius: 5px 0 0 5px;
  border: 2px solid ${(props) => props.color};
  padding: 1px 6px;
  color: ${(props) => props.color};
`;

const P = styled.p`
  color: ${(props) => props.color};
  margin: 10px 0;
`;

const LastSeen = styled.p`
  margin-left: 5px;
  color: ${(props) => props.color};
`;

export default function HeaderBar() {
  const { text, name, changeTheme, icon, textSecondary, header, headerNext } =
    useContext(ThemeContext);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <Header color={text}>
        <HeaderDiv justify="flex-start">
          <IconButton onIconClick={() => history.push("/homepage")}>
            <Home color={icon} size={20} />
          </IconButton>
          <LastSeen color={textSecondary}>
            {user && user.data
              ? "Welcome, " + user.data.name
              : "Last Seen • 6.02 AM"}
          </LastSeen>
        </HeaderDiv>
        <HeaderDiv justify="flex-end">
          {name === "dark" && (
            <IconButton onIconClick={() => changeTheme()}>
              <Sun color={icon} size={20} />
            </IconButton>
          )}
          {name === "light" && (
            <IconButton onIconClick={() => changeTheme()}>
              <Moon color={icon} size={20} />
            </IconButton>
          )}
          {!(user && user.data) ? (
            <IconButton onIconClick={() => history.push("/login")}>
              <LogIn color={icon} size={20} />
            </IconButton>
          ) : (
            <IconButton
              onIconClick={() => {
                dispatch(removeUser());
                dispatch(showToast("Logged out successfully."));
              }}
            >
              <LogOut color={icon} size={20} />
            </IconButton>
          )}
          <IconButton>
            <Menu color={icon} size={20} />
          </IconButton>
        </HeaderDiv>
      </Header>
      <HeaderExtend>
        <Title>
          <OnlyBorder color={header}>#ASK</OnlyBorder>
          <WhiteBg color={header} text={headerNext}>
            ARB
          </WhiteBg>
        </Title>
        <P color={textSecondary}> -- 300 questions asked --</P>
      </HeaderExtend>
    </>
  );
}
