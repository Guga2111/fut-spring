import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import ChatContent from "./ChatContent";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function PeladaChat({
  playersAssociated,
  allImages,
  peladaId,
  user,
}) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const userId = user.id;
      const token = localStorage.getItem("jwt");
      await axiosInstance.post(
        `/chat/pelada/${peladaId}/send/${userId}`,
        {
          content: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
  <div className="flex-1 overflow-y-auto">
    <ChatContent
      playersAssociated={playersAssociated}
      allImages={allImages}
      peladaId={peladaId}
    />
  </div>

  <div className="sticky bottom-0 w-full bg-background pt-2">
    <div className="flex flex-col sm:flex-row gap-2 p-4">
      <div className="flex-1">
        <Textarea
          className="w-full"
          placeholder="Type your message here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </div>
      <Button
        className="sm:w-auto w-full hover:!border-white"
        onClick={handleSendMessage}
        disabled={isLoading || !message.trim()}
      >
        <Send />
      </Button>
    </div>
  </div>
</div>

  );
}
