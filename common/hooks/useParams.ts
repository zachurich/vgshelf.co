import { useRouter } from "next/router";

/**
 * @description Simple wrapper for next's useRouter
 * @param {Object} params - Key/value pairs for appending query params to the request url
 */
const useParams = params => {
  const router = useRouter();
  return router.query;
};

export default useParams;
