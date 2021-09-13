import { GalleryImgItem, GalleryImg } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";
export const GalleryItem = ({ images, onClick }) => {
  return images.map(({ webformatURL, tags, largeImageURL }) => {
    return (
      <GalleryImgItem key={webformatURL} onClick={() => onClick(largeImageURL)}>
        <GalleryImg src={webformatURL} alt={tags} />
      </GalleryImgItem>
    );
  });
};

GalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
