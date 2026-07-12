
import { useState } from "react";

export default function GroqVision() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      setLoading(true);

      const res = await fetch("/api/groq-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      });

      const data = await res.json();
      setResult(data.result || "No result");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={analyze} disabled={loading || !file}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      <p>{result}</p>
    </div>
  );
}