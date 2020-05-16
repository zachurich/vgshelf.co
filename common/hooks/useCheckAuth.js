import { useState, useEffect, useContext } from "react";
import GlobalMessageContext from "../../contexts/globalMessage";
import { fetchCheckSession } from "../../api/checkAuth";
import { APP_ROUTES } from "../routes";
import useParams from "./useParams";

const useCheckAuth = () => {
  const { promptMessage } = useContext(GlobalMessageContext);
  const { userName } = useParams();
  const performAuthCheck = async () => {
    try {
      const data = await fetchCheckSession();
      if (data.userName === userName) {
        return true;
      }
      throw Error("Not authorized!");
    } catch (error) {
      promptMessage(
        {
          header: "Error",
          message: (
            <>
              You are not signed in. Please <a href={APP_ROUTES.LOGIN}>sign in</a> to
              perform this action!
            </>
          ),
        },
        true
      );
      return false;
    }
  };

  return { performAuthCheck };
};

export default useCheckAuth;
