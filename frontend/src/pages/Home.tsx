import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden">
      <Sidebar />

      {/* Message container with dark theme styles */}
      <div className="flex flex-col bg-gray-800 w-full">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
