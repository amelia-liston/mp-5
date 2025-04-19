import NewLinkForm from "@/app/components/NewLinkForm";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center bg-purple-200 p-4">
          <h1 className="text-3xl mt-6 mb-4 font-bold">URL Shortener</h1>
          <h2 className="text-2xl mb-4">Shorten your long urls to compact, shareable links</h2>
        <NewLinkForm />
      </div>
    </>
  );
}
