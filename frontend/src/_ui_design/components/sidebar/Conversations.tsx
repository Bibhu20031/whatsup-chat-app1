
import Conversation from "./Conversation";

const Conversations = ({ conversation }: { conversation: any }) => {
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			
				<Conversation key={conversation.id} conversation={conversation} />
		</div>
	);
};
export default Conversations;
