import styled from "styled-components";
const PaginationHolder = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const NextPrev = styled.div`
    height: 50px;
    width: 50px;
    color: white;
    font-size: 15;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    background: rgba(0,0,0,0.5);
    &:hover {
        background: rgba(0,0,0,0.1);
    }
`;

export default function Pagination() {
    return <PaginationHolder>
        <NextPrev>{"<<"}</NextPrev>
        <NextPrev>1</NextPrev>
        <NextPrev>2</NextPrev>
        <NextPrev>...</NextPrev>
        <NextPrev>34</NextPrev>
        <NextPrev>{">>"}</NextPrev>
    </PaginationHolder>;
}