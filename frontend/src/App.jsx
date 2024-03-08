import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  //  const [products, err, loading] = customReactQuery("/api/products");
  const [products, setProducts] = useState([]);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(" ");
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled ", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();

    //clean up
    return () => {
      controller.abort();
    };
  }, [search]);
  if (err) {
    return <h1>Something went wrong</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>Chai or API react </h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h2>Number of Products: {products.length}</h2>
    </>
  );
}

export default App;

const customReactQuery = (urlPath) => {
  const [products, setProducts] = useState([]);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(urlPath);
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);
  return [products, err, loading];
};
