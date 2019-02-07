import express from 'express'
import { ApolloEngine } from 'apollo-engine'
import compression from 'compression'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import schema from './data/schema'

const GRAPHQL_PORT = 3000

const engine = new ApolloEngine({
    apiKey: process.env.ENGINE_API_KEY,
})

const app = express()

// middleware
app.use(compression())
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({ schema, tracing: true })
)
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// used instead of app.listen, new API for apollo-engine
engine.listen(
    {
        expressApp: app,
        graphqlPaths: ['/graphql'],
        port: GRAPHQL_PORT,
        launcherOptions: {
            startupTimeout: 3000,
        },
    },
    () => {
        console.log(
            `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
        )
    }
)
