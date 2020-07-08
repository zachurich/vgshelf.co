import { useRouter } from "next/router";
import { useEffect } from "react";

import { checkDBUser } from "../../api/usersApi";
import { HTTP_STATUS } from "../constants";
import { APP_ROUTES } from "../routes";
import useAuth from "./useAuth";

export const useCheckRegisteredUser = () => {
  const user = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      checkDBUser({ userId: user.sub })
        .then((data) => {
          if (data.code === HTTP_STATUS.MISSING) {
            router.push(APP_ROUTES.REGISTER);
          }
        })
        .catch((error) => router.push(APP_ROUTES.ERROR));
    }
  });
};
