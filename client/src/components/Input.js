import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context";
const InputContainer = styled.div`
  display: flex;
  margin: 8px 0;
  flex-direction: column;
`;
const InputHolder = styled.input`
  height: auto;
  border: none;
  border-radius: 5px;
  width: 100%;
  background: ${(props) => props.bg};
  padding: 13px;
  color: #fff;
  box-shadow: 0 1.5px 3.5px rgba(0, 0, 0, 0.12);
  &:focus {
    outline: none;
  }
`;
const Label = styled.label`
  margin: 8px 0;
  color: ${(props) => props.color};
`;
export default function Input({ id, ...props }) {
  const { login } = useContext(ThemeContext);
  return (
    <InputContainer>
      <Label color={login.textSecondary} htmlFor={id}>
        {props.label}
      </Label>
      <InputHolder bg={login.inputBg} {...props} />
    </InputContainer>
  );
}
