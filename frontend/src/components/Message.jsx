import { useAuthContext } from "../context/AuthContext.jsx";
import useConversation from "../zustand/useConversation.js";
import PropTypes from "prop-types";
import { extractTime } from "../utils/extractTime.js";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  console.log(message);
  // Determine if the message is from the authenticated user
  const fromMe = message.senderId === authUser._id;

  // Handle cases where senderId might not be immediately available
  if (!message) {
    return (
      <div className="chat text-center">
        <p>Loading message...</p>
      </div>
    );
  }

  // Determine the CSS classes and profile picture based on message sender
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // Format the time if needed (commented out as not implemented in the example)
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Profile" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {/* Display formattedTime here if implemented */}
        {<span>{formattedTime}</span>}
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
