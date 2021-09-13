import { Gallery } from "./ImageGallery.styled";
import PropTypes from "prop-types";
export const ImageGallery = ({ children }) => {
  return <Gallery>{children}</Gallery>;
};

ImageGallery.propTypes = {
  children: PropTypes.object.isRequired,
};
