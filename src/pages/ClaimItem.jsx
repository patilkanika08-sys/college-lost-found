import { useState } from "react";
import { supabase } from "../supabase/client";

function ClaimItem() {

  const [message, setMessage] = useState("");

  const submitClaim = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
alert("Please login first");
      return;
    }
        console.log("Current user:",user);
        console.log("User email:",user.email);

    const { error } = await supabase
      .from("claims")
      .insert([
        {
          user_id: user.id,
          email: user.email,
          message: message,
          status: "pending",
        }
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Claim submitted successfully");
      setMessage("");
    }
  };


  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold">
        Claim Item
      </h1>

      <textarea
        placeholder="Enter claim message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 mt-4"
      />

      <br />

      <button
        onClick={submitClaim}
        className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"
      >
        Submit Claim
      </button>

    </div>
  );
}

export default ClaimItem;