import React, { Component } from "react";
import "./App.css";
import { apiRequest } from "./service/apiRequest";
import Searchbar from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { GalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import Loader from "react-loader-spinner";

class App extends Component {
  state = {
    images: [],
    hits: 0,
    searchValue: null,
    page: 1,
    isLoader: false,
    modalSrc: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchValue } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.loaderChange(true);
      apiRequest(searchValue, page)
        .then((data) => {
          if (data.hits.length !== 0) {
            this.setState((prevState) => {
              return {
                images: [...prevState.images, ...data.hits],
                hits: prevState.hits + data.hits.length,
              };
            });
          } else {
            toast.error(
              "Sorry, there are no images matching your search query. Please try again."
            );
          }
          this.scrollToBottom();
          this.loaderChange(false);
        })
        .catch((error) => {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
        });
    }
  }

  onSubmit = (searchbarData) => {
    const { value, hits, page } = searchbarData;
    value
      ? this.setState({
          images: [],
          searchValue: value,
          page,
          hits,
        })
      : this.setState({ page });
  };

  loaderChange = (position) => {
    return this.setState({ isLoader: position });
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  openModal = (bigImg) => {
    this.setState({ modalSrc: bigImg });
  };

  keyDown = (isCloseModal) => {
    if (isCloseModal) {
      this.setState({ modalSrc: "" });
    }
  };

  render() {
    const { hits, images, isLoader, modalSrc, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          <GalleryItem
            images={images}
            onClick={this.openModal}
            keyDown={this.keyDown}
          />
        </ImageGallery>
        {modalSrc && <Modal modalSrc={modalSrc} keyDown={this.keyDown} />}
        <Button onSubmit={this.onSubmit} page={page} hits={hits} />
        <Toaster position="top-right" />
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
      </div>
    );
  }
}

export default App;
