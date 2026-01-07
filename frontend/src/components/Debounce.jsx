import { useEffect, useState } from "react";

export const  Debounce=() => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Searching for:", query);
      // fetchData(query)
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}


export default Debounce