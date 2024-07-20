import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen overflow-y-auto hidden md:block w-1/2  flex-col">
      <SearchInput />
      <div className="divider border-b border-gray-700 px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;


