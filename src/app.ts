import app from './routes/express';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server has started listining on ${port}`);
});