import PropTypes from 'prop-types';

import Input from '../../common/Input';

function Filter({ onChangeDate, value }) {
  return (
    <Input
      label="Find contacts by name"
      type="text"
      onChange={onChangeDate}
      name="filter"
      value={value}
    />
  );
}

Filter.propTypes = {
  onChangeDate: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;
