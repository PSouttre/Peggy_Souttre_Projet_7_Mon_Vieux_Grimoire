// on importe le package HTTP natif de Node
import { createServer } from "http";
import app from "./app.js";

// on import notre app et on lui set un port
const port = process.env.PORT || "4000";

app.set("port", port);

// On créé un server avec notre app express en parametre
const server = createServer(app);

// eventListener
server.on("listening", () => {
  console.log("Listening on http://localhost:" + port);
});

// on demande au server d'écouter le port
server.listen(port);
