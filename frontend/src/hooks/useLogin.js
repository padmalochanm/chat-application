import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import useLoginValidation from "./useLoginValidation";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { validateLoginForm } = useLoginValidation();
  const { setAuthUser } = useAuthContext();
  const toast = useToast();

  const login = async (formData) => {
    const {email, password} = formData;
    if (
      !validateLoginForm({email, password})
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      localStorage.setItem("chat-user-token", data.token);
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
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

  return { loading, login };
};

export default useLogin;
