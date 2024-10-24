const express = require("express");
const app = express();

app.use(express.static(":/ruta-a-la-carpeta"));

// Middleware logger (es un mdw simple, no verifica nada)
app.use((req, res, next) => {
  console.log(
    `Paso por el mdw de la ruta ${req.url} con el metodo ${req.method}`
  );
  next(); // Es importante este next() por que sino la solicitud no pasa del mdw
});

// Middleware de logeo
app.use((req, res, next) => {
  if (req.query.login === "usuario1@gmail.com") {
    next();
  } else {
    res.send("acesso no autorizado");
  }
});

app.get("/mdwGET", (req, res) => {
  res.send("GET del mdw");
});
app.post("/mdwPOST", (req, res) => {
  res.send("POST del mdw");
});

app.get("/dashboard", (req, res) => {
  res.send("Dashboard");
});

const port = 3000;
app.listen(port);
console.log(`Listen on port ${3000}`);
