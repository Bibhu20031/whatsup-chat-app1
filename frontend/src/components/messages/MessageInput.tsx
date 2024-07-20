import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");

	const { loading, sendMessage } = useSendMessage();

	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (!selectedFile) return;
	
		
		if (!selectedFile.type.startsWith("image/")) {
		  alert("Please select an image file.");
		  return;
		}
	
		setImageFile(selectedFile);
	  };

	  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message.trim() && !imageFile) return; 
	
		
		if (imageFile) {
		  
		  await sendMessage(message, imageFile); 
		} else {
		  await sendMessage(message);
		}
	
		setMessage("");
		setImageFile(null);
	  };
	
	return (
		<form className='px-4 mb-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

                <input
                    id="imageFile"
                    type='file'
                    className='hidden' 
                    onChange={handleImageChange}
                />

				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <span className='loading loading-spinner' /> : <Send className='w-6 h-6 text-white' />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
