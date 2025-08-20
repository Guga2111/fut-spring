import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PenLine } from "lucide-react";
import { Link } from 'react-router-dom';

const FeaturesPanelContent = () => (
  <div className="flex h-full items-center justify-center p-6">
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center md:text-left">Features</h2>
      <ul className="space-y-2 font-medium text-gray-700">
        <li className="flex items-center gap-2">✔️ Schedule games easily</li>
        <li className="flex items-center gap-2">✔️ Presence control</li>
        <li className="flex items-center gap-2">✔️ Players statistics</li>
        <li className="flex items-center gap-2">✔️ Private and public groups</li>
      </ul>
    </div>
  </div>
);

const MainPanelContent = () => (
  <div className="flex h-full items-center justify-center p-6">
    <div className="w-full max-w-xl text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
        Play, schedule, <span className="text-green-600">connect</span>
      </h1>
      <p className="text-lg text-gray-600">
        Organize your soccer games, track attendance and stats, and keep your
        team on the field. Futspring is the platform made for those who love
        soccer with friends
      </p>
      <div className="flex justify-center">

        <img
          src="/gerrard-kissing.jfif"
          alt="Soccer illustration"
          className="h-40 w-40 mx-auto drop-shadow-lg rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
        <div className="text-xs text-gray-500 flex gap-1">
          <span>Already registered?</span>
          <Link to={"/register?tab=login"}>
          <a
            href="/register"
            className="underline hover:text-green-600 transition-colors"
          >
            Login
          </a>
          </Link>
        </div>
        <Link to={"/register?tab=register"}>        <a href="/register">
          <button className="!bg-white !text-green-700 border !border-green-700 hover:!bg-green-700 hover:!text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center w-full justify-center sm:w-auto">
            <PenLine size={15} className="mr-2" /> Get Started
          </button>
        </a>
        </Link>

      </div>
    </div>
  </div>
);

export default function LandingPageContent() {
  return (
    <div>

      <div className="md:hidden p-4 space-y-8">
        <MainPanelContent />
        <hr/>
        <FeaturesPanelContent />
      </div>

      <div className="hidden md:flex">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[750px] w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={25} minSize={20}>
            <FeaturesPanelContent />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} minSize={40}>
            <MainPanelContent />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}