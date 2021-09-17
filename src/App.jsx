import React, { useState, useEffect } from "react";
import "./App.css";
import { apiRequest } from "./service/apiRequest";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { GalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import Loader from "react-loader-spinner";

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [page, setPage] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  const onSubmit = (searchbarData) => {
    const { value, page } = searchbarData;
    if (value) {
      setSearchValue(value);
      setPage(page);
    } else {
      setPage(page);
    }
  };

  useEffect(() => {
    if (searchValue === null) {
      return;
    }
    if (page === 1) {
      setImages([]);
    }
    setIsLoader(true);
    apiRequest(searchValue, page)
      .then((data) => {
        if (data.hits.length !== 0) {
          setImages((ps) => [...ps, ...data.hits]);
        } else {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
        }
        scrollToBottom();
      })
      .catch((error) => {
        toast.error(
          "Sorry, there are no images matching your search query. Please try again."
        );
      })
      .finally(() => setIsLoader(false));
  }, [page, searchValue]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const loadMoreCondition = (images.length > 0) & !isLoader;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery>
        <GalleryItem
          images={images}
          onClick={setModalSrc}
          keyDown={setModalSrc}
        />
      </ImageGallery>
      {modalSrc && <Modal modalSrc={modalSrc} setModalSrc={setModalSrc} />}
      {loadMoreCondition && <Button onSubmit={onSubmit} page={page} />}
      {isLoader && (
        <Loader
          type="ThreeDots"
          color="#3f51b5"
          height={80}
          width={80}
          timeout={500}
          className="Loader"
        />
      )}
      <Toaster position="top-right" />
    </>
  );
};
