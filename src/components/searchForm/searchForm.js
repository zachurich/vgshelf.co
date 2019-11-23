import React from "react";
import { fetchResults } from "../../api/search";
import { debounce } from "../../common/utils";
import Autosuggest from "react-autosuggest";

import "./searchForm.scss";

const getSuggestions = results => {
  return results.map(result => ({ ...result }));
};

const getValue = value => value.name;

const renderSuggestion = suggestion => (
  <div className="w-full py-3 px-3">{suggestion.name}</div>
);

function renderSuggestionsContainer({ containerProps, children, query }) {
  return (
    <div
      {...containerProps}
      className="searchForm-suggestionsContainer absolute w-full bg-white rounded shadow"
    >
      {children}
    </div>
  );
}

export const SearchForm = ({
  inputName,
  displayValue,
  handleChange,
  handleSubmit,
  handleSelectValue
}) => {
  const [timer, setTimer] = React.useState(null);
  const [suggestions, setSuggestions] = React.useState([]);
  const getResults = async value => {
    if (typeof value == "string") {
      const results = await fetchResults(null, value);
      setSuggestions(() => getSuggestions(results));
    }
  };

  const clearResults = () => {
    setSuggestions(() => []);
  };

  return (
    <form
      className="search-form"
      onChange={e => {
        let valueOnInput = e.target.value;
        let timeout = debounce(timer, getResults, valueOnInput);
        setTimer(() => timeout);
      }}
      onSubmit={e => e.preventDefault()}
    >
      <label className="search-label" htmlFor={`${inputName.toLowerCase()}-title`}>
        {inputName}
      </label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={getResults}
        onSuggestionsClearRequested={clearResults}
        getSuggestionValue={getValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={handleSelectValue}
        // alwaysRenderSuggestions={true}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={{
          className: "search-suggest",
          name: `${inputName.toLowerCase()}-title`,
          type: "text",
          value: displayValue,
          onChange: handleChange
        }}
      />
    </form>
  );
};