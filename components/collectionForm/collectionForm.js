import React from "react";

import { createCollection } from "../../api/fetchers/collectionsApi";
import { useSetFocus } from "../../common/hooks/useSetFocus";
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

  const inputRef = useSetFocus(isOpen);

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

  const handleDismissModal = () => {
    handleToggleModal(false);
    setDisplayValue("");
  };
  return (
    <Modal
      open={isOpen}
      dismissModal={handleDismissModal}
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
            ref={inputRef}
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
