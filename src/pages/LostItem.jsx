import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";


function LostItem() {

const [itemName, setItemName] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
const [date, setDate] = useState("");

const [items, setItems] = useState([]);
const [editId, setEditId] = useState(null);
const [image, setImage] = useState(null);

useEffect(() => {
  getItems();
}, []);


const getItems = async () => {
  const { data, error } = await supabase
    .from("items")
    .select("*");

  if (error) {
    console.log(error);
  } else {
    setItems(data);
  }
};


const handleSubmit = async (e) => {
e.preventDefault();
console.log("Submit clicked");

const {
data: { user },
} = await supabase.auth.getUser();
console.log(user);
let imageUrl = null;

if (image) {
  const fileName = `${Date.now()}-${image.name}`;

  const { data, error } = await supabase.storage
    .from("item-images")
    .upload(fileName, image);
    console.log(error);

  if (error) {
    alert(error.message);
    return;
  }

  const { data: publicData } =supabase.storage
    .from("item-images")
    .getPublicUrl(fileName);
     console.log(publicData.publicUrl);
  imageUrl = publicData.publicUrl;
}

if(editId){

const { error } = await supabase
.from("items")
.update({
  title: itemName,
  description,
  location,
  date,
  imageUrl:imageUrl,
})
.eq("id", editId);


if(error){
alert(error.message);
}
else{
alert("Item updated successfully!");
setEditId(null);
getItems();
}

}

else{

const { error } = await supabase.from("items").insert({
title: itemName,
description,
location,
date,
image_url: imageUrl,
user_id: user.id,
});


if (error) {
  console.log(error);
alert(error.message);
} else {
alert("Item added successfully!");
getItems();
}

}

setItemName("");
setDescription("");
setLocation("");
setDate("");

};


const deleteItem = async (id) => {

const { error } = await supabase
.from("items")
.delete()
.eq("id", id);


if(error){
alert(error.message);
}
else{
alert("Item deleted successfully!");
getItems();
}

};

const claimItem = async (itemId) => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  const { error } = await supabase
    .from("claims")
    .insert({
      item_id: itemId,
      user_id: user.id,
      status: "pending",
    });

  if (error) {
    alert(error.message);
  } else {
    alert("Claim request sent successfully!");
  }

};

const editItem = (item) => {

setEditId(item.id);
setItemName(item.title);
setDescription(item.description);
setLocation(item.location);
setDate(item.date);
setImage(null);

};


return (
<div className="min-h-screen flex flex-col items-center bg-gray-100 p-5">

<form  
onSubmit={handleSubmit}  
className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
>

<h1 className="text-2xl font-bold text-center">
Add Lost Item
</h1>


<input  
type="text"  
placeholder="Item Name"  
className="w-full border p-3 rounded-lg"  
value={itemName}
onChange={(e)=>setItemName(e.target.value)}
/>


<textarea  
placeholder="Description"  
className="w-full border p-3 rounded-lg"  
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>


<input  
type="text"  
placeholder="Location"  
className="w-full border p-3 rounded-lg"  
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>


<input  
type="date"  
className="w-full border p-3 rounded-lg"  
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<input
type="file"
accept="image/*"
onChange={(e) =>setImage(e.target.files[0])}
/>

< button 
 type="submit"  
className="w-full bg-blue-600 text-white p-3 rounded-lg">
{editId ? "Update" : "Submit"}
</button>


</form>



<div className="mt-5 w-96">

<h2 className="text-xl font-bold">
Lost Items
</h2>


{items.map((item)=>(

<div key={item.id} className="bg-white p-4 mt-3 rounded-lg shadow">

<h3 className="font-bold">{item.title}</h3>
{item.image_url && (
  <img
    src={item.image_url}
    alt={item.title}
    className="w-40 h-40 object-cover rounded mt-2"
  />
)}

<p>{item.description}</p>

<p>{item.location}</p>

<p>{item.date}</p>


<button 
onClick={()=>editItem(item)}
className="bg-green-500 text-white px-3 py-1 mr-2 mt-2"
>
Edit
</button>


<button 
onClick={()=>deleteItem(item.id)}
className="bg-red-500 text-white px-3 py-1 mt-2"
>
Delete
</button>

<button
onClick={() => claimItem(item.id)}
  className="bg-yellow-500 text-white px-3 py-1 rounded"
>
  Claim Item
</button>


</div>

))}

</div>


</div>
);
}

export default LostItem;