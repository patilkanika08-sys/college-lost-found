import { useState } from "react";
import { askGroq } from "../services/groq.js";

function GroqAI() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAI = async () => {
    const result = await askGroq(question);
    setAnswer(result);
  };

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold">
        Groq AI Assistant
      </h1>

      <input
        className="border p-2 mt-4"
        placeholder="Ask AI..."
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
      />

      <button
        onClick={handleAI}
        className="bg-blue-600 text-white px-4 py-2 ml-2"
      >
        Ask
      </button>

      <p className="mt-4">
        {answer}
      </p>

    </div>
  );
}

export default GroqAI;