import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";

export default function ChatContent({
  playersAssociated,
  allImages,
  peladaId,
}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const resp = await axios.get(
          `${API_BASE_URL}/chat/pelada/${peladaId}/messages`
        );
        setMessages(resp.data);
      } catch (error) {
        console.error("Erro ao buscar as mensagens", error);
      }
    };
    fetchAllMessages();

    const interval = setInterval(fetchAllMessages, 10000);
    return () => clearInterval(interval);
  }, [peladaId]);

  const getUserImage = (imgFilename) => {
    const hasImage = allImages.includes(imgFilename);
    return hasImage
      ? `${API_BASE_URL}/user/images/${imgFilename}`
      : "/backgroundbalotelli.jpg";
  };

  return (
    <div
      className="chat-container p-4 flex flex-col"
      style={{ height: "600px" }}
    >
      <h3 className="text-lg font-medium mb-4">Chat of Pelada</h3>

      <div
        className="flex-1 overflow-y-auto pr-1"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #F7FAFC",
          overscrollBehavior: "contain",
        }}
      >
        {messages.length > 0 ? (
          messages.map((message) => {
            const sender = message.sender;
            const imgSrc = getUserImage(sender.image);

            return (
              <div
                key={message.id}
                className="flex items-start p-2 hover:bg-gray-100 rounded-md mb-3"
              >
                <div className="flex-shrink-0 mr-3">
                  <div className="overflow-hidden rounded-full w-10 h-10">
                    <img
                      src={imgSrc}
                      alt={sender.username || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline">
                    <span className="font-medium mr-2">{sender.username}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.sentAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1 break-words whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-4">No message found</div>
        )}

        {messages.length > 0 && (
          <div className="text-center text-xs text-gray-500 mt-2 mb-2">
            Fim das mensagens
          </div>
        )}
      </div>
    </div>
  );
}
