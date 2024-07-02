import { useToast } from "@chakra-ui/react";

const useValidation = () => {
  const toast = useToast();

  const validateSignupForm = ({ name, email, password, confirmPassword, gender }) => {
    if (!name || !email || !password || !confirmPassword || !gender) {
      toast({
        title: "Please fill in all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Password must be at least 6 characters",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  return {
    validateSignupForm,
  };
};

export default useValidation;
