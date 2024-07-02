import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      const token = localStorage.getItem("chat-user-token");
      try {
        const res = await fetch(`http://localhost:8000/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
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

    getConversations();
  }, [toast]);

  return { loading, conversations };
};
export default useGetConversations;
