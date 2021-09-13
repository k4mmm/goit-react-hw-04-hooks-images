import { ModalImg, Overlay } from "./Modal.styled";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onCloseModal);
  }

  onCloseModal = (e) => {
    if (e.target === e.currentTarget || e.code === "Escape") {
      this.props.keyDown(true);
    }
  };

  render() {
    const { modalSrc } = this.props;

    return (
      <Overlay onClick={this.onCloseModal}>
        <ModalImg>
          <img src={modalSrc} alt="Big img" />
        </ModalImg>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  keyDown: PropTypes.func.isRequired,
  modalSrc: PropTypes.string.isRequired,
};
