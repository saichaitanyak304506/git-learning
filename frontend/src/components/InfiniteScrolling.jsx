import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://dummyjson.com/todos";
const LIMIT = 5;

const InfiniteScrolling = () => {
  const [query, setQuery] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // 🔹 Fetch todos with limit & pagination
  const fetchTodos = async (pageNumber) => {
    try {
      setLoading(true);
      setErrorMsg("");

      const skip = pageNumber * LIMIT;

      const response = await axios.get(
        `${BASE_URL}?limit=${LIMIT}&skip=${skip}`
      );

      const newTodos = response.data.todos;

      // Append data
      setTodos((prev) => [...prev, ...newTodos]);

      // Check if more data exists
      setHasMore(newTodos.length === LIMIT);
    } catch (error) {
      setErrorMsg("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial load & pagination
  useEffect(() => {
    fetchTodos(page);
  }, [page]);

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full">
      <div className="w-80">
        <h1 className="font-serif text-center mb-2">
          Infinite Scrolling (Load More)
        </h1>

        {/* Search (not yet filtered, just UI ready) */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search todo..."
          className="border border-gray-400 mt-3 pl-2 py-3 rounded-md w-full outline-none"
        />

        {/* List */}
        <ul className="mt-5 h-40 overflow-y-auto border border-gray-400 rounded-md">
          {/* Initial loading */}
          {loading && todos.length === 0 && (
            <p className="p-2 text-center">Loading...</p>
          )}

          {/* Error */}
          {errorMsg && (
            <p className="p-2 text-red-500 text-center">{errorMsg}</p>
          )}

          {/* Todos */}
          {todos.map((todoItem,index) => (
            <li
              key={`${todoItem.id}-${index}`}
              className="py-2 hover:bg-gray-200 pl-2"
            >
              <p className="text-gray-500">{todoItem.todo}</p>
            </li>
          ))}
        </ul>

        {/* Load More */}
        {hasMore && !loading && todos.length > 0 && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
          >
            Load More
          </button>
        )}

        {/* Loading more */}
        {loading && todos.length > 0 && (
          <p className="mt-2 text-center">Loading more...</p>
        )}

        {/* No more data */}
        {!hasMore && todos.length > 0 && (
          <p className="mt-2 text-center text-gray-500">No more data</p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrolling;
