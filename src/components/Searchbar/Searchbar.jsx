import React, { Component } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {
  ButtonLabel,
  SearchButton,
  SearchForm,
  SearchInput,
  Searchbar as SearchbarItem,
} from "./Searchbar.styled";

export default class Searchbar extends Component {
  state = {
    value: "",
  };

  onSearchChange = (e) => {
    this.setState({ value: e.currentTarget.value });
  };

  formSubmit = (e) => {
    const { value } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();

    value.trim() === ""
      ? toast.error("Search is empty")
      : onSubmit({ value: value, page: 1, hits: 0 });
  };

  render() {
    const { value } = this.state.value;
    return (
      <SearchbarItem>
        <SearchForm onSubmit={this.formSubmit}>
          <SearchButton type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>

          <SearchInput
            onChange={this.onSearchChange}
            type="text"
            autocomplete="off"
            value={value}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarItem>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
