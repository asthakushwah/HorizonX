import { useState } from "react";
import { earthImages } from "../assets/earthImagesData";
import GalleryCard from "../components/GalleryCard";
import Modal from "../components/Modal";

export default function EarthPage() {
  const [preview, setPreview] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  const currentImage = earthImages[sliderIndex];

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">

      {/* HEADER */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-hover mb-3">
          Earth
        </p>

        <h1 className="font-display text-4xl font-semibold mb-3">
          Our planet from orbit
        </h1>

        <p className="text-white/50 max-w-xl">
          Full-disc captures of Earth, refreshed daily from orbit.
        </p>
      </div>


      {/* TIMELINE SLIDER */}
      <div className="mb-10 p-6 rounded-xl2 border border-border bg-card">

        <div className="flex items-center justify-between mb-3">

          <p className="text-sm text-white/60">
            Viewing capture
          </p>

          <p className="text-sm font-medium">
            {currentImage.title}
          </p>

        </div>


        <input
          type="range"
          min={0}
          max={earthImages.length - 1}
          value={sliderIndex}
          onChange={(e) => setSliderIndex(Number(e.target.value))}
          className="w-full accent-hover"
        />


        {/* LARGE IMAGE */}
        <div className="mt-6 rounded-xl2 overflow-hidden border border-border">

          <img
            src={currentImage.image}
            alt={currentImage.title}
            className="w-full h-72 sm:h-96 object-cover"
          />

        </div>

      </div>


      {/* GALLERY */}
      <h2 className="font-display text-xl font-semibold mb-5">
        Latest Earth images
      </h2>


      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">

        {earthImages.map((item, i) => (

          <GalleryCard
            key={i}
            item={item}
            onPreview={setPreview}
            delay={(i % 8) * 0.04}
          />

        ))}

      </div>


      {/* MODAL */}
      <Modal
        item={preview}
        onClose={() => setPreview(null)}
      />

    </div>
  );
}