import { supabase } from "./supabase/client";

async function testConnection() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  console.log("Data:", data);
  console.log("Error:", error);
}

testConnection();