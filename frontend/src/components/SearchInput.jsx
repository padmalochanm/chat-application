import { IconButton, Input, useToast } from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import useConversation from "../zustand/useConversation.js";
import useGetConversations from "../hooks/useGetConversations.js";
import { useState } from "react";

const SearchInput = () => {
  const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();
  const toast = useToast();
  const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.name.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="search user"
          className="input input-bordered rounded-full text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          variant="solid"
          colorScheme="teal"
          aria-label="Done"
          fontSize="20px"
          icon={<SearchIcon />}
          type="submit"
        />
      </form>
    </>
  )
}

export default SearchInput
