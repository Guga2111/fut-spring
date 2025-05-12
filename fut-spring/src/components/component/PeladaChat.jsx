import { Textarea } from "@/components/ui/textarea";

export default function PeladaChat() {
  return (
    <div className="flex flex-col h-96">
      {" "}
      {/* Changed to h-screen */}
      <div className="flex-1 overflow-y-auto">
        <h1>He</h1>
      </div>
      <div className="sticky bottom-0 w-full bg-background pt-2">
        <Textarea className="w-full" placeholder="Type your message here." />
      </div>
    </div>
  );
}
