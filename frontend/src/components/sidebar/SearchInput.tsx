import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation, { ConversationType } from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form className="flex items-center gap-2 bg-gray-800 rounded-full overflow-hidden p-1.5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="text-sm md:text-base px-3 py-1.5 rounded-full w-full focus:outline-none text-gray-200 bg-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn-icon rounded-full bg-green-500 text-white hover:bg-green-700">
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;

