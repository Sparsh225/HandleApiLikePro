import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "cap",
      title: "a joke",
      content: "This is a joke",
    },
    {
      id: 2,
      name: "bat",
      title: "this is another joke",
      content: "Another joke",
    },
    {
      id: 3,
      name: "kit",
      title: "this is third joke",
      content: "third joke",
    },
    {
      id: 4,
      name: "bowl",
      title: "this is fourth joke",
      content: "this is joke",
    },
    {
      id: 5,
      name: "colthes",
      title: "this is fifth joke",
      content: "nice  joke",
    },
    {
      id: 6,
      name: "rock",
      title: "this is sixth joke",
      content: "bad joke",
    },
  ];
  if (req.query.search) {
    const filterpro = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    res.send(filterpro);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 3000);
});

app.listen(800, () => {
  console.log("server started at 800");
});
