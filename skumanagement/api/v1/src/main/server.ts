import app from "./app";

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen({ port: PORT, host: HOST }, () => {
  console.log(`[INFO] Server is running on http://${HOST}:${PORT}`);
});
