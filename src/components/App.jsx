import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from './Loader/Loader';
import { Api, searchPixabayAPI } from ".././Api/Api";
import Modal from "./Modal/Modal";

class App extends Component {
  state = {
    bigImagePath: "",
    loader: false,
    page: 1, 
    hits: [],
    error: null,
    search: "",
    modal: false,
    loadingMore: false, // Додали новий стан для відстеження підзавантаження контенту
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if ((search && prevState.search !== search) || page !== prevState.page) {
      this.fetchImages();
    }
  }

  onSearch = search => {
    this.setState({ 
      search,
      page: 1,
      hits: [], // Clear the hits array when starting a new search
    });
  }

  async fetchImages() {
    const { search, page } = this.state;
    this.setState({
      loader: true,
    });
        
    try {
      let data;
      if (search) {
        data = await searchPixabayAPI(search, page);
      } else {
        data = await Api(page);
      }
      setTimeout(() => {
        this.setState(({ hits }) => {
          return {
            hits: page === 1 ? data.hits : [...hits, ...data.hits],
            loader: false,
            loadingMore: false, // Закінчили підзавантаження, зупинивши Loader
          }
        });
      }, 300);
    } catch (error) {
      this.setState({
        error,
        loader: false,
        loadingMore: false, // Закінчили підзавантаження, зупинивши Loader у разі помилки
      });
    }
  }

  loadMore = () => {
    this.setState({ loadingMore: true }, () => {
      this.setState(({ page }) => {
        return {
          page: page + 1,
        };
      });
    });
  }

  toggleModal = (path) => {
    this.setState({
      bigImagePath: path,
    });
  }

  render() {
    const { loader, hits, error, bigImagePath, loadingMore } = this.state;
    const { onSearch, loadMore, toggleModal } = this;

    return (
      <div>
        <Searchbar onSearch={onSearch} />
        {bigImagePath && (
          <Modal onClick={toggleModal} path={bigImagePath}>
            <img src={bigImagePath} alt="" />
          </Modal>
        )}

        {error && <p>!!!</p>}
       
        <ImageGallery image={hits} toggleModal={toggleModal} />

        {/* Відображаємо кнопку "Load More" або Loader, залежно від значення loadingMore */}
        {!loadingMore && hits.length > 0 && <Loader click={loadMore} />}
        {loadingMore && <Loader loading={true} />}

      </div>
    );
  }
}

export default App;
