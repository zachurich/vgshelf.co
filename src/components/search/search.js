import React from "react";

export const Search = ({ inputName, handleSubmit }) => {
  const [value, setValue] = React.useState("");
  return (
    <form className="mb-6 w-full" onSubmit={() => handleSubmit(value)}>
      <label className="block mb-2" htmlFor={`${inputName.toLowerCase()}-title`}>
        {inputName}
      </label>
      <input
        className="shadow rounded w-full appearance-none border py-2 px-3 leading-tight text-base"
        name={`${inputName.toLowerCase()}-title`}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};
