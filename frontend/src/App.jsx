import { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleAddItem = () => {
    const item = { name: newItem };
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setItems((prevItems) => [...prevItems, data.item]);
        setNewItem("");
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  return (
    <div>
      <h1>React App with Node.js API</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id || Math.random()}>{item.name}</li>
        ))}
      </ul>
      <h2>Add New Item</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={handleAddItem}>Add Item</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;