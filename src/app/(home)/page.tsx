import { client } from "@/utils/client";
import { ConnectButton } from "thirdweb/react";
import UploadComponent from "./upload";
import Header from "@/ui/connect-button";

export default function Home() {
  return (
    <main className="w-full min-h-screen h-full">
      <div className="w-full h-full block max-w-6xl mx-auto py-5">
        <Header />
        <article className="mt-24 w-full max-w-sm h-full mx-auto py-5">
          <UploadComponent />
        </article>
      </div>
    </main>
  );
}
