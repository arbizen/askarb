import { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
  width: auto;
  .circle {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.7);
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

export default function Ripple({ children }) {
  const container = useRef(null);
  const handleClick = (event) => {
    const circle = document.createElement("span");
    const diameter = Math.max(
      container.current.clientWidth,
      container.current.clientHeight
    );
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - (container.current.offsetLeft + radius)
    }px`;
    circle.style.top = `${
      event.clientY - (container.current.offsetTop + radius)
    }px`;
    circle.classList.add("ripple");
    const ripple = container.current.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }
    container.current.appendChild(circle);
  };
  return (
    <Container ref={container} onClick={handleClick}>
      {children}
    </Container>
  );
}
