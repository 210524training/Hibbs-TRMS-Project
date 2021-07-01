import app from './routes/express';

const port = process.env.PORT || 3050;


app.listen(port, () => {
  console.log(`Server has started listining on ${port}`);
});