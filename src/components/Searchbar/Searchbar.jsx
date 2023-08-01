import style from 'components/Searchbar/Searchbar.module.css';
import React, { Component } from 'react';
import PropTypes from "prop-types";

class Searchbar extends Component  {
  state = {
    search: '',
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search.trim() === "") {
      alert("Поле пошуку пусте");
      return;
    }
    this.props.onSearch(this.state.search.trim());
    this.reset();
  }
  
  reset() {
    this.setState({
      search: '', 
    })
  }

  render() {
    const { search } = this.state;
    const { handleSubmit, handleChange } = this; // Use handleChange consistently

    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={handleSubmit}>
          <button className={style.SearchForm_batton} type="submit">
            <span>Search</span>
          </button>

          <input
            name="search"
            className={style.SearchForm_input}   
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange} // Use handleChange here
            value={search}
          />
        </form>
      </header>
    )
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func
}
