import styled from "styled-components";
const IconButtonHolder = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 2.5px;
  &:hover {
    filter: brightness(1.3);
  }
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;

export default function IconButton({ children, onIconClick }) {
  return <IconButtonHolder onClick={onIconClick}>{children}</IconButtonHolder>;
}
