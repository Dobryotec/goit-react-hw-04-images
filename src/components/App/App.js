import { useEffect, useState } from 'react';
import { fetchImages } from '../services/fetch';
import Searchbar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadMoreButton from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    function downloadImages() {
      setIsLoading(true);
      try {
        fetchImages(searchText, page)
          .then(({ hits }) => {
            setImages(prevImages => [...prevImages, ...hits]);
            setShowBtn(hits.length >= 12);
          })
          .catch(error => {
            console.error('Error fetching images:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
    if (searchText) {
      downloadImages(searchText);
    }
  }, [searchText, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const createSearchText = searchText => {
    setSearchText(searchText);
    setImages([]);
    setPage(1);
  };

  const showModal = image => {
    setIsShowModal(true);
    setLargeImageURL(image);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar createSearchText={createSearchText} />
      <ImageGallery images={images} showModal={showModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && showBtn && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
      {isShowModal && (
        <Modal hideModal={hideModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
}
