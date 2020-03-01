import React, { useState } from "react";
import { fetchResults } from "../../api/search";
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
import FormControls from "../formControls/formControls";

export const SearchForm = ({
  inputName,
  placeholder,
  handleSubmit,
  handleAddSelection,
  dismissModal,
  closeText,
  submitText
}) => {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const { debounce } = useDebounce();
  const [suggestions, setSuggestions] = useState([]);
  const [selection, setSelection] = useState(null);

  const handleSelectValue = suggestion => {
    setSelection(() => suggestion);
    handleAddSelection(suggestion);
    setDisplayValue(() => "");
  };

  const handleClearValues = () => {
    setSelection(() => "");
  };

  const handleDismiss = () => {
    handleClearValues();
    dismissModal();
  };

  const getResults = async value => {
    const results = await fetchResults(value);
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
        style={{
          position: "relative"
        }}
        onSelect={item => {
          setFocused(() => false);
          handleSelectValue(pluckSuggestion(item));
        }}
      >
        <ComboboxInput
          autoComplete="off"
          placeholder={placeholder}
          type="text"
          aria-labelledby={inputName}
          onBlur={() => setFocused(() => false)}
          onFocus={() => setFocused(() => true)}
          value={displayValue}
          onChange={e => {
            let valueOnInput = e.target.value;
            setDisplayValue(() => valueOnInput);
            debounce(getResults, valueOnInput);
          }}
        />
        <ComboboxPopover
          className="search-option-list-container"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 99999
          }}
          portal={false}
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
      <FormControls
        handleDismiss={handleDismiss}
        closeText={closeText}
        disabled={!selection}
        submitText={submitText}
        handleSubmit={() => handleSubmit()}
      />
    </div>
  );
};
