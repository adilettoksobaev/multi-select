import React from 'react';
import SelectMultiItem from '../select-multi-item';
import './select-multi.css';

const SelectMulti = ({ values, onDelete }) => {
    const listItems = values.map((option) => {
        const { id, ...itemProps } = option;
        return (
            <div key={id} className="select-multi__item">
                <SelectMultiItem { ...itemProps }  
                                  onDelete={()=> onDelete(option)}/>
            </div>
        );
    });

    return (<div className="select-multi">{ listItems }</div>);
};

export default SelectMulti;