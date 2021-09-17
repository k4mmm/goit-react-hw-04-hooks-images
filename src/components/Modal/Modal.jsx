import { ModalImg, Overlay } from "./Modal.styled";
import PropTypes from "prop-types";
import React, { useEffect, useCallback } from "react";

export const Modal = ({ modalSrc, setModalSrc }) => {
  const onCloseModal = useCallback(
    (e) => {
      if (e.target === e.currentTarget || e.code === "Escape") {
        setModalSrc("");
      }
    },
    [setModalSrc]
  );

  useEffect(() => {
    window.addEventListener("keydown", onCloseModal);
    return () => {
      window.removeEventListener("keydown", onCloseModal);
    };
  }, [onCloseModal, modalSrc]);

  return (
    <Overlay onClick={onCloseModal}>
      <ModalImg>
        <img src={modalSrc} alt="Big img" />
      </ModalImg>
    </Overlay>
  );
};

Modal.propTypes = {
  keyDown: PropTypes.func.isRequired,
  modalSrc: PropTypes.string.isRequired,
};
