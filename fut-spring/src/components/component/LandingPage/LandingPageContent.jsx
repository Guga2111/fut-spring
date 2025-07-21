import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function LandingPageContent() {
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[800px] max-w-md rounded-lg border md:min-w-full"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">
              <h2>Features</h2>
              <ul>
                <li>✔️ Schedule games easily</li>
                <li>✔️ Presence control</li>
                <li>✔️ Players statistics</li>
                <li>✔️ Private and public groups</li>
              </ul>
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">
              <div className="w-full max-w-xl text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Play, schedule,{" "}
                  <span className="text-green-600">connect</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Organize your soccer games, track attendance and stats, and
                  keep your team on the field. Futspring is the platform made
                  for those who love soccer with friends
                </p>
                <div className="flex justify-center">
                  <img
                    src="/public/gerrard-kissing.jfif"
                    alt="Soccer illustration"
                    className="h-40 mx-auto drop-shadow-lg rounded-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="text-xs text-gray-500 flex gap-1">
                    <span>Already registered?</span>
                    <a
                      href="/login"
                      className="!underline hover:!text-green-600 !transition-colors"
                    >
                      Login
                    </a>
                  </div>
                  <a href="/register">
                    <button className="hover:!bg-green-600 text-white font-medium py-2 px-4 rounded-md !transition-colors ">
                      Get Started
                    </button>
                  </a>
                </div>
              </div>
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
