import type { MetaFunction } from "@remix-run/node";
import RecordingSection from "../components/RecordingSection";

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
      <div className="h-full w-4/5 md:w-1/2">
        <RecordingSection />
      </div>
    </div>
  );
}
