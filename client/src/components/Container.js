import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context";

const ContainerHolder = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${(props) => props.bg};
`;

export default function Container({ children }) {
  const { background } = useContext(ThemeContext);
  return <ContainerHolder bg={background}>{children}</ContainerHolder>;
}
