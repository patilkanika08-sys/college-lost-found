import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function FoundItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  

  const fetchItems = async () => {
    const { data } = await supabase
      .from("items")
      .select("*")
      .eq("type", "found")
      .order("date", { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      location,
      date,
      type: "found",
    };

    if (editId) {
     const { error } = await supabase.from("items").update(payload).eq("id", editId);
      if (error) alert(error.message);
    } else {
     const { error }  = await supabase.from("items").insert(payload);
    if (error)alert(error.message);
  }

    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    fetchItems();
  };

  const handleDelete = async (id) => {
    await supabase.from("items").delete().eq("id", id);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setLocation(item.location);
    setDate(item.date);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Found Items</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="border p-2 rounded" placeholder="Item Name"
            value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="border p-2 rounded" placeholder="Description"
            value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Location"
            value={location} onChange={(e) => setLocation(e.target.value)} />
          <input className="border p-2 rounded" type="date"
            value={date} onChange={(e) => setDate(e.target.value)} />
          <button className="bg-green-600 text-white rounded p-2">
            {editId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-8 grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.location}</p>
            <p>{item.date}</p>
            <button
              onClick={() => handleEdit(item)}
              className="mr-2 bg-blue-500 text-white px-3 py-1 rounded">
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}