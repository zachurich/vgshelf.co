import { useState, useEffect, useContext } from "react";
import GlobalMessageContext from "../../contexts/globalMessage";
import { fetchCheckAuth } from "../../api/checkAuth";
import { APP_ROUTES } from "../routes";

const useCheckAuth = () => {
  const { promptMessage } = useContext(GlobalMessageContext);
  const performAuthCheck = async () => {
    try {
      await fetchCheckAuth();
      return true;
    } catch (error) {
      promptMessage(
        {
          header: "Error",
          message: (
            <>
              You are not signed in. Please <a href={APP_ROUTES.LOGIN}>sign in</a> to
              perform this action!
            </>
          )
        },
        true
      );
      return false;
    }
  };

  return { performAuthCheck };
};

export default useCheckAuth;
