import styled from "styled-components";
import { useEffect } from "react";
import { X } from "react-feather";
const Container = styled.div`
  height: auto;
  width: 50%;
  max-width: 600px;
  background: #000;
  background: #191e2c;
  position: fixed;
  padding: 16px 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 250;
  border-radius: 4px;
  transition: opacity 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 100ms cubic-bezier(0.4, 0, 0.2, 1) 20ms;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  @media only screen and (max-width: 600px) {
    height: auto;
    width: 90%;
  }
  ${(props) =>
    props.show
      ? `
   opacity: 1;
   transform: translate(-50%, -50%);
  `
      : `
       opacity: 0;
       visibility: hidden;
       transform: translate(-50%, -50%) scale(0.75, 0.5625);
      `}
`;
const DialogContent = styled.div`
  padding: 20px 0;
`;
const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 230;
  background: rgba(0, 0, 0, 0.6);
`;

const Close = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: none;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;

const DialogHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

const DialogTitle = styled.h3`
  color: #fff;
`;

const DialogHeaderSecondaryContainer = styled.p`
  color: #959da5;
`;

const DialogFooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DialogButton = styled.button`
  padding: 5px 10px;
  background: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;

export function DialogHeader({ children }) {
  return <DialogHeaderContainer>{children}</DialogHeaderContainer>;
}

export function DialogSecondaryHeader({ children }) {
  return (
    <DialogHeaderSecondaryContainer>{children}</DialogHeaderSecondaryContainer>
  );
}

export function DialogFooter({ children }) {
  return <DialogFooterContainer>{children}</DialogFooterContainer>;
}

export function Dialog({
  show,
  onClose,
  title,
  secondaryTitle,
  onProceed,
  children,
  defaultView,
}) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "visible";
    }
  }, [show]);
  return (
    <>
      <Container show={show}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <Close onClick={onClose}>
            <X />
          </Close>
        </DialogHeader>
        <DialogSecondaryHeader>{secondaryTitle}</DialogSecondaryHeader>
        <DialogContent>{children}</DialogContent>
        {defaultView && (
          <DialogFooter>
            <DialogButton onClick={onClose}>Cancel</DialogButton>
            <DialogButton onClick={onProceed}>Ask</DialogButton>
          </DialogFooter>
        )}
      </Container>
      ;
      {show && (
        <>
          <Backdrop onMouseUp={onClose} onDrag={onClose} onClick={onClose} />
        </>
      )}
    </>
  );
}
