import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';
import SelectMulti from '../select-multi';
import SelectOption from '../select-option';

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            arrow: false,
            searchValue: '',
            options: [
                { id: 1, value: 'Bishkek'},
                { id: 2, value: 'Moscow'},
                { id: 3, value: 'New York'},
                { id: 4, value: 'London'},
                { id: 5, value: 'Berlin'},
                { id: 6, value: 'Liverpul'},
                { id: 7, value: 'Manchester'},
                { id: 8, value: 'Los Angeles'},
                { id: 9, value: 'Toronto'}
            ],
            values: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.focus = this.focus.bind(this);
    }

    updateInputValue = (input, event) => {
		const newState = {};
		newState[input] = event.target.value;
		this.setState(newState);
	}

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState(() => ({
                isToggleOn: false
            }));
        }
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    optionClick(option) {
        this.setState({value: [...this.state.value,option.value]});
    }
    focus() {
        this.textInput.focus();
    }
    onDelete = (option) => {
        
        this.setState(({ values, options }) => {
            const idx = values.findIndex((el) => el.id === option.id);
            const newArray = [...values.slice(0, idx), ...values.slice(idx + 1)];
            const newArr = [
                ...options,
                option
            ];
            return {
                values: newArray,
                options: newArr
            };
        });
    };
    addItem = (option) => {
    
        this.setState(({ values, options }) => {
            const idx = options.findIndex((el) => el.id === option.id);
            const newArray = [...options.slice(0, idx), ...options.slice(idx + 1)];
            const newArr = [
                ...values,
                option
            ];

            return {
                values: newArr,
                options: newArray
            }
        });

    };

    search(items, searchValue) {
        if(searchValue.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.value.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        })
    }

    render() {
        const { options, values, searchValue} = this.state;
        const visibleItems = this.search(options, searchValue);
        return (
            <div ref={this.setWrapperRef} className={`select ${this.state.isToggleOn || this.state.searchValue.length > 0 ? 'select_open' : 'select_hide'}`} onClick={this.handleClick}>
                <div className="select__custom" onClick={this.focus}>
                    <span className="select__multi">
                        {values.length || this.state.searchValue.length > 0 ? (
                            <SelectMulti 
                                values={values}
                                onDelete={this.onDelete}/>
                        ) : (
                            <span className="select__plaseholder">Select...</span>
                        )}
                    </span>
                    <AutosizeInput
                        className="select__input"
                        ref={(input) => { this.textInput = input; }}
                        autoFocus
                        value={this.state.searchValue}
                        onChange={this.updateInputValue.bind(this, 'searchValue')}
                    />
                </div>
                <div className="select__arrow">
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
                </div>
                <SelectOption onItemAdded={this.addItem} options={visibleItems}/>
            </div>
        );
    }
}