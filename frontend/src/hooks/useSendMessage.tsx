import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string, imageFile?: File | null) => { // Allow optional imageFile
    if (!selectedConversation) return;
    setLoading(true);

    try {
      const formData = new FormData(); // Use FormData for image uploads
      formData.append("message", message); // Add text message

      if (imageFile) {
        formData.append("image", imageFile); // Add image file if available
      }

      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        body: formData, // Send data using FormData
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;



// import { useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useSendMessage = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	const sendMessage = async (message: string) => {
// 		if (!selectedConversation) return;
// 		setLoading(true);
// 		try {
// 			const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ message }),
// 			});
// 			const data = await res.json();
// 			if (data.error) throw new Error(data.error);

// 			setMessages([...messages, data]);
// 		} catch (error: any) {
// 			toast.error(error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { sendMessage, loading };
// };
// export default useSendMessage;
