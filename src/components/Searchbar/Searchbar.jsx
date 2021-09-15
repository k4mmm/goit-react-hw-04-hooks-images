import React, { useState } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {
  ButtonLabel,
  SearchButton,
  SearchForm,
  SearchInput,
  Searchbar as SearchbarItem,
} from "./Searchbar.styled";

export const Searchbar = ({ value, onSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    searchValue.trim() === ""
      ? toast.error("Search is empty")
      : onSubmit({ value: searchValue, page: 1 });
  };

  return (
    <SearchbarItem>
      <SearchForm onSubmit={formSubmit}>
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>

        <SearchInput
          onChange={onSearchChange}
          type="text"
          autocomplete="off"
          value={value}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarItem>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
