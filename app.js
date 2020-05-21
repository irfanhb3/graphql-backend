const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();


const uri = "mongodb+srv://irfan:irfanbhati@cluster0-3gyqc.mongodb.net/graph-db?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected…");
})
.catch(err => console.log(err))


app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log("node started");
})

