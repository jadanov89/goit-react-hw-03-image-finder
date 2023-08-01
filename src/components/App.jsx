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
  }
//llll
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
    })
  }

  // async fetchImages() {
  //   const { search, page } = this.state;
  //   this.setState({
  //     loader: true,
  //   });
      
  //   try {
  //     const data = await Api(search, page);
  //     this.setState(({ hits }) => {
  //       return {
  //         hits: page === 1 ? data.hits : [...hits, ...data.hits],
  //       }
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error
  //     });
  //   } finally  {
  //     this.setState({
  //       loader: false,
  //     });
  //   }
  // }

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
      this.setState(({ hits }) => {
        return {
          hits: page === 1 ? data.hits : [...hits, ...data.hits],
        }
      });
    } catch (error) {
      this.setState({
        error
      });
    } finally  {
      this.setState({
        loader: false,
      });
    }
  }
  

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  }

  toggleModal = (path) => {
    this.setState({
      bigImagePath: path,
    });
  }

  render() {
    const { loader, hits, error, bigImagePath } = this.state;
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
        {loader && <Loader
          height={80}
          width={80}
          radius={9}
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />}
        {hits.length > 0 && <Loader click={loadMore} />}
      </div>
    );
  }
};
  
export default App;
