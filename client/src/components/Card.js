import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context";

const CardHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
`;

const MainCard = styled.div`
  position: relative;
  height: auto;
  width: calc(50% - 20px);
  background: ${(props) => props.bg};
  margin: 10px;
  padding: 20px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const CardBarHolder = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
`;

const Left = styled.div`
  display: flex;
  width: ${(props) => (props.full ? "100%" : "80%")};
  justify-content: flex-start;
  align-items: center;
  color: #d3d3d3;
  font-size: 13px;
`;
const Right = styled.div`
  display: flex;
  width: ${(props) => (props.full ? "100%" : "50%")};
  justify-content: flex-start;
  flex-direction: row-reverse;
  align-items: center;
`;

const CardHeaderText = styled.h3`
  margin-bottom: 16px;
`;

const CardBodyText = styled.p`
  margin-bottom: 16px;
  color: #959da5;
`;

const HiddenCardHolder = styled.div`
  height: 100%;
  width: 100%;
  color: #808080;
  padding: 5px 10px;
  border-left: 3px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardInfoHolder = styled.p`
  margin: 0 0 10px 0;
  color: #808080;
`;

export function CardContainer({ children }) {
  return <CardHolder>{children}</CardHolder>;
}

export function Card({ children }) {
  const { card } = useContext(ThemeContext);
  return <MainCard bg={card}>{children}</MainCard>;
}

export function HiddenCard({ children }) {
  return <HiddenCardHolder>{children}</HiddenCardHolder>;
}

export function CardBar({ left, right, leftfull, rightfull, at }) {
  return (
    <CardBarHolder at={at}>
      {!rightfull && <Left full={leftfull}>{left && left}</Left>}
      {!leftfull && <Right full={rightfull}>{right && right}</Right>}
    </CardBarHolder>
  );
}

export function CardText({ type, text }) {
  return (
    <>
      {type === "header" && <CardHeaderText>{text}</CardHeaderText>}
      {type === "body" && <CardBodyText>{text}</CardBodyText>}
    </>
  );
}

export function CardInfo({ children }) {
  return <CardInfoHolder>{children}</CardInfoHolder>;
}
