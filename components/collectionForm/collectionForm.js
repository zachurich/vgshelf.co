import React from "react";

import { createCollection } from "../../api/collectionsApi";
import FormControls from "../formControls/formControls";
import Modal from "../modal/modal";

export const CollectionForm = ({
  user,
  isOpen,
  handleToggleModal,
  inputName,
  placeholder,
  closeText,
  submitText,
  refreshData,
}) => {
  const [displayValue, setDisplayValue] = React.useState("");
  const handleChange = (e) => {
    let value = e.target.value;
    setDisplayValue(value);
  };
  const handleCreateCollection = async (title) => {
    if (title.length > 0) {
      await createCollection({
        userId: user.sub,
        collectionName: title,
        games: [],
      });
      handleToggleModal(false);
      setDisplayValue("");
      refreshData();
    }
  };
  return (
    <Modal
      open={isOpen}
      dismissModal={() => handleToggleModal(false)}
      header={"Create a Shelf"}
      content={() => (
        <form
          className="basic-form"
          onChange={handleChange}
          onSubmit={() => handleCreateCollection(displayValue)}
        >
          <input
            className="basic-form-input"
            name={`${inputName.toLowerCase()}-title`}
            placeholder={placeholder}
            type="text"
            value={displayValue}
            onChange={handleChange}
          />
        </form>
      )}
      footer={() => (
        <FormControls
          handleDismiss={() => handleToggleModal(false)}
          closeText={closeText}
          disabled={!displayValue}
          submitText={submitText}
          handleSubmit={() => handleCreateCollection(displayValue)}
        />
      )}
    />
  );
};
