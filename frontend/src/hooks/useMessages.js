import { useState, useEffect, useCallback } from "react";
import useConversation from "../zustand/useConversation";
import { useToast } from "@chakra-ui/react";

const useMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [shouldFetch, setShouldFetch] = useState(false);

  const getMessages = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("chat-user-token");
    try {
      const res = await fetch(
        `http://localhost:8000/api/messages/${selectedConversation._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(data.messages || []);
    } catch (error) {
      toast({
        title: "An error occurred while fetching messages",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [selectedConversation?._id, setMessages, toast]);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("chat-user-token");
      if (!token) {
        throw new Error("No authorization token found");
      }
      const res = await fetch(
        `http://localhost:8000/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ message }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }
      const data = await res.json();
      setMessages([...messages, data]);
      setShouldFetch(true);
    } catch (error) {
      toast({
        title: "An error occurred while sending message",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, getMessages]);

  useEffect(() => {
    if (shouldFetch && selectedConversation?._id) {
      getMessages();
      setShouldFetch(false);
    }
  }, [shouldFetch, selectedConversation?._id, getMessages]);

  return { messages, loading, sendMessage };
};

export default useMessages;
