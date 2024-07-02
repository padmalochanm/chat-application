import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useValidation from "./useValidation";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { validateSignupForm } = useValidation();
    const {authUser, setAuthUser} = useAuthContext();
  const signup = async (formData) => {
    const { name, email, password, confirmPassword, gender } = formData;

    if (
      !validateSignupForm({ name, email, password, confirmPassword, gender })
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, gender }),
      });

      const data = await res.json();
      if (data.error) {
        toast({
          title: "Signup failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      localStorage.setItem("chat-user-token", data.token);
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      if (res.ok) {
        toast({
          title: "Signup successful",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup failed",
          description: data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
  };
};

export default useSignup;
