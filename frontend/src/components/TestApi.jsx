import React, { useEffect, useState } from "react";
import { getConversations } from "../services/api";

export default function TestApi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getConversations().then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Conversations from Backend:</h2>
      <ul>
        {data.length > 0 ? (
          data.map((c) => (
            <li key={c.id}>
              {c.title} — {new Date(c.created_at).toLocaleString()}
            </li>
          ))
        ) : (
          <li>No conversations found.</li>
        )}
      </ul>
    </div>
  );
}
