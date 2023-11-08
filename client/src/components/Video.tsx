export default function Video() {
  return (
    <div className="aspect-ratio-16-9 mt-6">
      <iframe
        className="w-full h-full absolute top-0 left-0"
        src="https://www.youtube.com/embed/RIZdjT1472Y?si=rSf3mUs2pQFS2efM"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
