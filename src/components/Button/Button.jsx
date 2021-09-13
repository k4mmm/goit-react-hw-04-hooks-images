import PropTypes from "prop-types";
import { LoadMore } from "./Button.styled";
export const Button = ({ onSubmit, page, hits }) => {
  const submit = (e) => {
    e.preventDefault();
    onSubmit({ page: page + 1 });
  };
  return (
    hits !== 0 && (
      <LoadMore type="submit" onClick={submit}>
        Load more
      </LoadMore>
    )
  );
};

Button.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  hits: PropTypes.number.isRequired,
};
