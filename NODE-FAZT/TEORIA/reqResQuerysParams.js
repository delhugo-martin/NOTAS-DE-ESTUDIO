const express = require("express");
const app = express();

// Metodos necesarios para leer la info que
// llega desde el cliente (insomnia)
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false })); // para datos mas complicados

app.get("/productos", (req, res) => {
  res.sendFile("./static/index.html", { root: __dirname });
});

// POST con body =============
app.post("/producto", (req, res) => {
  //res.json({ nombre: "destornillador" });
  console.log(req.body);
  res.send("Producto registrado");
});

// GET con params =============
app.get("/productos/:nombre", (req, res) => {
  console.log(req.params);
  console.log(typeof req.params.nombre);
  res.send(`Producto encontrado: ${req.params.nombre.toUpperCase()}`);
});

// ejemplo con destructuración
app.get("/suma/:x/:y", (req, res) => {
  const { x, y } = req.params;
  res.send(`La suma es: ${parseInt(x) + parseInt(y)}`);
});

// ejemplo con archivos
app.get("/productos", (req, res) => {
  if (req.params.user === "martin") {
    //es importantisimo este RETURN
    return res.sendFile("./static/image01.png", { root: __dirname });
  }
  res.send(`Usuario incorrecto`);
});

// QUERYS ======================
app.get("/search", (req, res) => {
  console.log(req.query);
  if (req.query.x === "martin") {
    res.send("Usuario martin encontrado");
  } else {
    res.send("usuario no encontrado");
  }
});

app.put("/productos", (req, res) => {
  res.send("modificando un producto");
});

app.delete("/productos", (req, res) => {
  res.send("eliminando sun producto");
});

app.patch("/productos", (req, res) => {
  res.send("sobre nosotros pa");
});

app.use((req, res) => {
  res.status(404).send("ruta equivocada");
});

const port = 3000;
app.listen(port);
console.log(`Listen on port ${3000}`);
