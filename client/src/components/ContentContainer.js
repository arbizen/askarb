import styled from "styled-components";
const ContentContainerHolder = styled.div`
  height: auto;
  width: 100%;
  color: #fff;
  padding: 20px;
  max-width: 650px;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 10px;
  }
  ${(props) => props.css && props.css}
`;
export default function ContentContainer({ children, css }) {
  return <ContentContainerHolder css={css}>{children}</ContentContainerHolder>;
}
