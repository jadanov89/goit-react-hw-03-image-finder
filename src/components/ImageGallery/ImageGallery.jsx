import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import style from "components/ImageGallery/ImageGallery.module.css"
import PropTypes from "prop-types";




const ImageGallery = ({ image, toggleModal }) => {
  // Check if the image array is empty
  if (image.length === 0) {
    return null; // If there are no images, don't render the list
  }

  return (
    <ul className={style.ImageGallery}>
      {image.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          img={webformatURL}
          key={id}
          onClick={() => toggleModal(largeImageURL)} // Pass the largeImageURL to the toggleModal function
          imgLarge={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string,
      id: PropTypes.number,
      largeImageURL: PropTypes.string,
    })
  ),
  toggleModal: PropTypes.func,
};
