import { useContext, useEffect, useState } from "react";

import { fetchCheckSession } from "../../api/checkAuth";
import GlobalMessageContext from "../../contexts/globalMessage";
import { API_ROUTES } from "../routes";
import useParams from "./useParams";

const useCheckAuth = () => {
  const { promptMessage } = useContext(GlobalMessageContext);
  const { userName } = useParams();
  const performAuthCheck = async () => {
    try {
      const data = await fetchCheckSession();
      console.log(userName, data);
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
              You are not signed in. Please <a href={API_ROUTES}>sign in</a> to perform
              this action!
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
