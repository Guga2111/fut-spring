import { Textarea } from "@/components/ui/textarea";
import ChatContent from "./ChatContent";

export default function PeladaChat({ playersAssociated, allImages, peladaId }) {
  return (
    <div className="flex flex-col h-96">
      {" "}
      {/* Changed to h-screen */}
      <div className="flex-1 overflow-y-auto">
        <ChatContent
          playersAssociated={playersAssociated}
          allImages={allImages}
          peladaId={peladaId}
        ></ChatContent>
      </div>
      <div className="sticky bottom-0 w-full bg-background pt-2">
        <Textarea className="w-full" placeholder="Type your message here." />
      </div>
    </div>
  );
}
