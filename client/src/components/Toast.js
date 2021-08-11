import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../redux/reducers/toast";

const ToastHolder = styled.div`
  height: auto;
  width: auto;
  display: inline-block;
  background: #4caf50;
  color: #fff;
  padding: 10px 15px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  transform: translateX(-110%);
  transition: transform 0.5s;
  border-radius: 5px;
`;

export default function Toast() {
  const toast = useSelector((state) => state.toast.value);
  return <>{toast && toast.show && <ToastInside />}</>;
}

export function ToastInside() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast.value);
  const container = useRef();
  useEffect(() => {
    container.current.style.transform = "translateX(0)";
    const t = setTimeout(() => {
      container.current.style.transform = "translateX(-150%)";
      setTimeout(() => {
        dispatch(hideToast());
      }, 1000);
    }, 2000);
    return () => {
      clearTimeout(t);
    };
  }, [toast?.show, dispatch]);
  return (
    <ToastHolder ref={container} show={toast && toast.show}>
      {toast && toast.text}
    </ToastHolder>
  );
}
