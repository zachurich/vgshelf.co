import React from "react";
import { fetchResults } from "../../api/search";
import { debounce } from "../../common/utils";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import "./searchForm.scss";
import { useDebounce } from "../../common/hooks";

export const SearchForm = ({
  inputName,
  displayValue,
  handleChange,
  handleSubmit,
  handleSelectValue
}) => {
  const [focused, setFocused] = React.useState(false);
  const { debounce } = useDebounce();
  const [suggestions, setSuggestions] = React.useState([]);

  const getResults = async value => {
    const results = await fetchResults(null, value);
    setSuggestions(() => results);
  };

  const pluckSuggestion = item =>
    suggestions.filter(suggestion => suggestion.name === item)[0];

  return (
    <div className="form">
      <label className="search-label" htmlFor={`${inputName.toLowerCase()}-title`}>
        {inputName}
      </label>
      <Combobox
        onSelect={item => {
          setFocused(() => false);
          handleSelectValue(pluckSuggestion(item));
        }}
      >
        <ComboboxInput
          autoComplete="off"
          className={suggestions.length > 0 && focused ? "search-suggestions-open" : ""}
          type="text"
          aria-labelledby={inputName}
          onBlur={() => setFocused(() => false)}
          onFocus={() => setFocused(() => true)}
          onChange={e => {
            let valueOnInput = e.target.value;
            debounce(getResults, valueOnInput);
          }}
        />
        <ComboboxPopover
          className="search-option-list-container"
          style={{ zIndex: 99999 }}
        >
          <ComboboxList className="search-option-list" aria-labelledby="Select an Option">
            {suggestions.length > 0 &&
              suggestions.map(item => (
                <ComboboxOption
                  className="search-option"
                  key={item.id}
                  value={item.name}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
