import { useToast } from "@chakra-ui/react";

const useLoginValidation = () => {
  const toast = useToast();

  const validateLoginForm = ({ email, password}) => {
    if (!email || !password) {
        toast({
          title: "Please fill in all the fields",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return false;
      }
    return true;
  };

  return {
    validateLoginForm,
  };
};

export default useLoginValidation;
