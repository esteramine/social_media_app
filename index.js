const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(()=> {
        console.log('MongoDB Connected!');
        return server.listen({ port: 4000 });
    })
    .then(res=>{
        console.log(`Server listening at ${res.url}`);
    });