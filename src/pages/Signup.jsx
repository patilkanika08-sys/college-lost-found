import { useState } from "react";
import { supabase } from "../supabase/client";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    alert("handleRegister called");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          user_id: user.id,
          full_name: fullName,
          email: email,
        },
      ]);

    if (profileError) {
      alert(profileError.message);
    } else {
      alert("Register successful!");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Signup;