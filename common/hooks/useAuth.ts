import { useUser } from '@auth0/nextjs-auth0';

// Wrapper just in case
const useAuth = () => {
  const { user } = useUser();
  return user;
};

export default useAuth;
