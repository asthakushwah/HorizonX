import { Download } from "lucide-react";

export default function DownloadButton({ imageUrl, imageName = "horizonx-image" }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to download image");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${imageName}.jpg`;

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Unable to download image");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition"
      title="Download image"
    >
      <Download className="w-4 h-4" />
    </button>
  );
}