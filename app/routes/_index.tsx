import type { MetaFunction } from "@remix-run/node";
import RecordingSection from "../components/RecordingSection";
import { GithubLogo } from "@phosphor-icons/react";
import favIcon from "../../public/favicon.ico";

export const meta: MetaFunction = () => {
  return [
    { title: "QuikSave" },
    {
      name: "description",
      content:
        "Welcome to QuikSave, here you will be able to record audios and save them.",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex items-center justify-center h-screen w-screen from-purple-300 to-blue-300 bg-gradient-to-b">
      <div className="h-full w-4/5 md:w-1/2 text-center">
        <div className="my-10 space-y-4">
          <h1 className="text-3xl flex items-center justify-center">
            <img src={favIcon} alt="QuikSave" className="w-10 h-10 mr-1" />
            uikSave
          </h1>
          <h6 className="text-xl">
            <span className="italic">{`"An idea that is developed and put into action is more important than an idea that exists only as an idea." - Buddha`}</span>
          </h6>
        </div>
        <RecordingSection />
      </div>
      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-end text-xs text-blue-100 bg-blue-900 py-2">
        <GithubLogo size={16} className="mx-1" />
        <span>by </span>
        <a
          href="https://github.com/NahuelBurdisso"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1 text-blue-100 hover:text-blue-300"
        >
          @NahuelBurdisso
        </a>
      </footer>
    </div>
  );
}
