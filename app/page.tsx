import NewLinkForm from "@/app/components/NewLinkForm";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center bg-blue-200 p-4">
          <h1>URL Shortener</h1>
          <h2>Shorten your long urls to compact, shareable links</h2>
        <NewLinkForm />
      </div>
    </>
  );
}
