

const Messages = ({ Message }: { Message?: any }) => {
	return (
		<div className='px-4 flex-1 overflow-auto'>
			
				<Message key={Message.id} message={Message} />
		</div>
	);
};
export default Messages;
