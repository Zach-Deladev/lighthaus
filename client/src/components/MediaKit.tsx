import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function MediaKit() {
  const handleDownload = () => {
    const downloadUrl = "Add download link here";
    window.open(downloadUrl, "_blank");
    toast.info("Brand Kit Downloaded!");
  };

  return (
    <div className="bg-indigo-100">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          From the press?
          <br />
          Download our Media Kit.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a
            href="#"
            onClick={handleDownload}
            className="rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
          >
            Download
          </a>
          <Link
            to="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
