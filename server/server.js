import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = err.message || "Internal server error.";
  res.status(statusCode).json({
    success: false,
    message,
  });
});
