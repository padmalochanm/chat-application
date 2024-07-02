import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
    const toast = useToast();
	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch(`http://localhost:8000/api/auth/logout`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user-token");
			localStorage.removeItem("chat-user");
			setAuthUser(null);
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

	return { loading, logout };
};
export default useLogout;