import { useRouter } from "next/router";
import React from "react";

const isIndex = (page) => {
  return page === "/";
};

const usePage = () => {
  const router = useRouter();
  return {
    isIndex: isIndex(router.pathname),
    page: router.pathname,
  };
};

export default usePage;
