import React from 'react';

const SelectOption = ({ options, onItemAdded }) => {
  const listItems = options.map((option) => {
    return (
        <li key={option.id} onClick={() => onItemAdded(option)}  className="select__option">
            { option.value }
        </li>
    );
  });

  return (
    <ul className="select__options"> 
      { listItems.length ? listItems : <li className="select__option select__option_disabled"> No options...</li> }
    </ul>);
};

export default SelectOption;
