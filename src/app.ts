import app from './routes/express';

const port = process.env.PORT || 3050;
console.log(process.env.PORT);
console.log(process.env.WEB_CLIENT_ORIGIN);

app.listen(port, () => {
  console.log(`Server has started listining on ${port}`);
});