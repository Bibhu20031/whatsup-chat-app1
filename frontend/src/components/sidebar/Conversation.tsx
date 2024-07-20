import { useSocketContext } from "../../context/SocketContext";
import useConversation, { ConversationType } from "../../zustand/useConversation";

const Conversation = ({ conversation }: { conversation: ConversationType}) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-700 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-green-500 text-white" : "text-gray-200"
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 md:w-12 rounded-full overflow-hidden">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-sm md:text-md">{conversation.fullName}</p>
            
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1 bg-gray-600" />
    </>
  );
};

export default Conversation;






