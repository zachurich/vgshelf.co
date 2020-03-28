import _ from "lodash";
import React, { useState } from "react";
import { fetchResults, fetchCover } from "../../api/search";
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
import { ButtonAction } from "../buttons/buttons";
import FormSelections from "../formSelections/formSelections";

export const SearchForm = ({
  inputName,
  placeholder,
  handleSubmit,
  dismissModal,
  closeText
}) => {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const { debounce } = useDebounce();
  const [suggestions, setSuggestions] = useState([]);

  const [selection, setSelection] = useState(null);
  const [selections, setSelections] = useState([]);

  const handleSelectValue = game => {
    setSelection(game);
    setDisplayValue(() => game.name);
  };

  const handleSelection = async () => {
    const coverData = await fetchCover(selection.id);
    selection.cover = _.get(coverData[0], "url");
    setSelections(prevSelections => [...prevSelections, selection]);
    handleClearValues();
  };

  const handleClearValues = () => {
    setSelection(null);
    setDisplayValue(() => "");
  };

  const handleDismiss = () => {
    handleClearValues();
    setSelections([]);
    dismissModal();
  };

  const getResults = async value => {
    const results = await fetchResults(value);
    setSuggestions(() => results);
  };

  const pluckSuggestion = item =>
    suggestions.filter(suggestion => suggestion.name === item)[0];

  return (
    <>
      <FormSelections selections={selections} />
      <div className="form">
        <div className="search-form-input-wrap">
          <Combobox
            className="search-form-input"
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
              // portal={false}
            >
              <ComboboxList
                className="search-option-list"
                aria-labelledby="Select an Option"
              >
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
          <ButtonAction disabled={!selection} handleAction={() => handleSelection()} />
        </div>
        <FormControls
          handleDismiss={handleDismiss}
          closeText={closeText}
          disabled={!selection && !selections.length}
          submitText={`Add ${selections.length !== 0 ? selections.length : ""} Game${
            selections.length <= 1 ? "" : "s"
          }`}
          handleSubmit={() => {
            if (selection) {
              handleSubmit([selection]);
            } else if (selections.length > 0) {
              handleSubmit(selections);
            }
          }}
        />
      </div>
    </>
  );
};
