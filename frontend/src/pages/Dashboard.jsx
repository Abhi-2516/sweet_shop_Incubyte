import { useEffect, useState } from "react";
import api from "../api";
import { getUserRole } from "../utils";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "Dessert",
    price: "",
    quantity: ""
  });

  const role = getUserRole();
  const isAdmin = role === "admin";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchSweets = async () => {
    const params = new URLSearchParams();
    if (search) params.append("name", search);
    if (category) params.append("category", category);

    const url = params.toString()
      ? `/sweets/search?${params.toString()}`
      : "/sweets";

    const res = await api.get(url);
    setSweets(res.data);
  };

  const purchaseSweet = async (id) => {
    await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
    fetchSweets();
  };

  const addSweet = async () => {
    await api.post("/sweets", {
      ...newSweet,
      price: Number(newSweet.price),
      quantity: Number(newSweet.quantity)
    });
    setNewSweet({ name: "", category: "Dessert", price: "", quantity: "" });
    fetchSweets();
  };

  const restockSweet = async (id) => {
    const qty = prompt("Enter restock quantity");
    if (!qty) return;
    await api.post(`/sweets/${id}/restock`, { quantity: Number(qty) });
    fetchSweets();
  };

  const updatePrice = async (id) => {
    const price = prompt("Enter new price");
    if (!price) return;
    await api.put(`/sweets/${id}`, { price: Number(price) });
    fetchSweets();
  };

  const deleteSweet = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    fetchSweets();
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Sweet Shop Dashboard</h1>
        <button className="button" onClick={logout} style={{ width: "120px" }}>
          Logout
        </button>
      </div>

      {/* ADMIN ADD FORM */}
      {isAdmin && (
        <div className="admin-form">
          <input
            className="input"
            placeholder="Name"
            value={newSweet.name}
            onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
          />

          <select
            className="input"
            value={newSweet.category}
            onChange={(e) =>
              setNewSweet({ ...newSweet, category: e.target.value })
            }
          >
            <option>Dessert</option>
            <option>Chocolate</option>
            <option>Candy</option>
            <option>Bakery</option>
          </select>

          <input
            className="input"
            placeholder="Price"
            type="number"
            value={newSweet.price}
            onChange={(e) =>
              setNewSweet({ ...newSweet, price: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Quantity"
            type="number"
            value={newSweet.quantity}
            onChange={(e) =>
              setNewSweet({ ...newSweet, quantity: e.target.value })
            }
          />

          <button className="button" onClick={addSweet}>
            Add Sweet
          </button>
        </div>
      )}

      {/* SEARCH BAR */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          className="input"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Dessert</option>
          <option>Chocolate</option>
          <option>Candy</option>
          <option>Bakery</option>
        </select>

        <button className="button" onClick={fetchSweets} style={{ width: "120px" }}>
          Search
        </button>
      </div>

      {/* SWEETS */}
      {sweets.length === 0 ? (
        <p>No sweets found for selected filters.</p>
      ) : (
        <div className="sweets-grid">
          {sweets.map((sweet) => (
            <div className="sweet-card" key={sweet._id}>
              <h3>{sweet.name}</h3>
              <p>Category: {sweet.category}</p>
              <p>Price: ₹{sweet.price}</p>
              <p>Available: {sweet.quantity}</p>

              <button
                className="button"
                disabled={sweet.quantity === 0}
                onClick={() => purchaseSweet(sweet._id)}
              >
                {sweet.quantity === 0 ? "Out of Stock" : "Buy 1"}
              </button>

              {isAdmin && (
                <div className="admin-actions">
                  <button className="button" onClick={() => restockSweet(sweet._id)}>
                    Restock
                  </button>
                  <button className="button" onClick={() => updatePrice(sweet._id)}>
                    Update
                  </button>
                  <button className="button" onClick={() => deleteSweet(sweet._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
