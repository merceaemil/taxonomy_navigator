import { DataStructureTool } from "./components/DataStructureTool";

export default function App({dataUrl}: {dataUrl?: string}) {
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4">
        <div className="mx-auto">
          <DataStructureTool dataUrl={dataUrl}/>
        </div>
      </main>
    </div>
  );
}