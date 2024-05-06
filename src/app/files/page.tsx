import Header from "@/ui/connect-button";
import Files from "./components/Files";

export default function FilesPage() {
  return (
    <main className="w-full h-full min-h-screen">
      <article className="w-full min-h-screen bg-opacity-50 mix-blend-multiply backdrop-blur-md bg-white">
        <div className="max-w-6xl w-full mx-auto">
          <Header></Header>
          <Files />
        </div>
      </article>
    </main>
  );
}
