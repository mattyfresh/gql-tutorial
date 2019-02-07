import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import mocks from './mocks'
import resolvers from './resolvers'

const typeDefs = `
type Query {
  testString: String
  foo: Int
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  post(title: String): Post
  allPosts: [Post]
}

type Author {
  id: ID!
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: ID
  title: String
  text: String
  author: [Author]
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

// addMockFunctionsToSchema({ schema, mocks })

export default schema
