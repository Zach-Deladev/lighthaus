import Newsletter from "../components/Newsletter";

export default function Music({ onHome }) {
  return (
    <div>
      <div className="container mx-auto text-center my-12">
        <h1
          className={`${
            onHome ? "text-5xl" : "text-5xl"
          } text-white font-semibold`}
        >
          Latest Songs
        </h1>
        <iframe
          className="my-10"
          src="https://open.spotify.com/embed/artist/7EQ0qTo7fWT7DPxmxtSYEc?utm_source=generator&theme=0"
          width="100%"
          height="700"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

<iframe
  style="border-radius:12px"
  src="https://open.spotify.com/embed/artist/7EQ0qTo7fWT7DPxmxtSYEc?utm_source=generator&theme=0"
  width="100%"
  height="352"
  frameBorder="0"
  allowfullscreen=""
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
></iframe>;
