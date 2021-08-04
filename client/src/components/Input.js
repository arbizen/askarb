import styled from "styled-components";
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
  background: rgba(255, 255, 255, 0.1);
  padding: 13px;
  color: #fff;
`;
const Label = styled.label`
  margin: 8px 0;
  color: #d3d3d3;
`;
export default function Input({ id, ...props }) {
  return (
    <InputContainer>
      <Label htmlFor={id}>{props.label}</Label>
      <InputHolder {...props} />
    </InputContainer>
  );
}
