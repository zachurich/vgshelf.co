import "@reach/combobox/styles.css";

import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import _ from "lodash";
import React, { useState } from "react";

import { createGame } from "../../api/gamesApi";
import { fetchCover, fetchResults } from "../../api/search";
import { useDebounce } from "../../common/hooks";
import {
  handleServerError,
  handleServerResponse,
  isClientSide,
} from "../../common/utils";
import { ButtonAction } from "../buttons/buttons";
import FormControls from "../formControls/formControls";
import FormSelections from "../formSelections/formSelections";
import Modal from "../modal/modal";

export const SearchForm = ({
  user,
  isOpen,
  handleToggleModal,
  inputName,
  placeholder,
  closeText,
  refreshData,
}) => {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const { debounce } = useDebounce();
  const [suggestions, setSuggestions] = useState([]);

  const [selection, setSelection] = useState(null);
  const [selections, setSelections] = useState([]);

  const handleSubmit = async (games) => {
    let message;
    for (const game of games) {
      const coverData = await fetchCover(game.id);
      game.cover = _.get(coverData[0], "url");
      try {
        const response = await createGame({
          userId: user.sub,
          title: game.name,
          igdbId: game.id,
          slug: game.slug,
          imageUrl: game.cover,
        });
        message = handleServerResponse(response.data);
      } catch (error) {
        handleServerError(error.respose ? error.response.data : error);
      }
    }

    if (!message) {
      handleToggleModal(false);
      refreshData();
    }

    clearAllFormData();
  };

  const clearAllFormData = () => {
    setSelection(null);
    setSelections([]);
    setDisplayValue(() => "");
  };

  const handleSelectValue = (game) => {
    setSelection(game);
    setDisplayValue(() => game.name);
  };

  const handleSelection = async () => {
    const coverData = await fetchCover(selection.id);
    selection.cover = _.get(coverData[0], "url");
    setSelections((prevSelections) => [...prevSelections, selection]);
    handleClearValues();
  };

  const handleClearValues = () => {
    setSelection(null);
    setDisplayValue(() => "");
  };

  const handleRemoveSelection = (selectionToRemove) => {
    setSelections(
      selections.filter((selection) => selection.id !== selectionToRemove.id)
    );
  };

  const getResults = async (value) => {
    const results = await fetchResults(value);
    setSuggestions(() => results);
  };

  const pluckSuggestion = (item) =>
    suggestions.filter((suggestion) => suggestion.name === item)[0];
  if (!isClientSide()) {
    console.log(true);
    return null;
  }
  return (
    <Modal
      open={isOpen}
      dismissModal={() => handleToggleModal(false)}
      header={"Search by Game Title"}
      content={() => (
        <>
          <FormSelections
            selections={selections}
            handleRemoveSelection={handleRemoveSelection}
          />
          <div className="form search-form">
            <div className="search-form-input-wrap">
              <Combobox
                className="search-form-input"
                style={{
                  position: "relative",
                }}
                onSelect={(item) => {
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
                  onChange={(e) => {
                    let valueOnInput = e.target.value;
                    setDisplayValue(() => valueOnInput);
                    debounce(getResults, valueOnInput);
                  }}
                />
                {suggestions.length > 0 && (
                  <ComboboxPopover
                    className="search-option-list-container"
                    style={{
                      position: "absolute",
                      width: "100%",
                      zIndex: 99999,
                    }}
                  >
                    <ComboboxList
                      className="search-option-list"
                      aria-labelledby="Select an Option"
                    >
                      {suggestions.map((item) => (
                        <ComboboxOption
                          className="search-option"
                          key={item.id}
                          value={item.name}
                        />
                      ))}
                    </ComboboxList>
                  </ComboboxPopover>
                )}
              </Combobox>
              <ButtonAction
                disabled={!selection}
                handleAction={() => handleSelection()}
              />
            </div>
          </div>
        </>
      )}
      footer={() => (
        <FormControls
          closeText={closeText}
          disabled={!selection && !selections.length}
          submitText={`Add ${selections.length !== 0 ? selections.length : ""} Game${
            selections.length <= 1 ? "" : "s"
          }`}
          handleDismiss={() => handleToggleModal(false)}
          handleSubmit={() => {
            if (selection) {
              handleSubmit([selection]);
            } else if (selections.length > 0) {
              handleSubmit(selections);
            }
          }}
        />
      )}
    />
  );
};
