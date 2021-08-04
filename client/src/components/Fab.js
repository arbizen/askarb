import styled from "styled-components";
const FabButton = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
export default function Fab({ onClick, children }) {
  return <FabButton onClick={onClick}>{children}</FabButton>;
}
