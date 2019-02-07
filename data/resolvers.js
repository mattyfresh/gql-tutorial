import { Author, Post } from './connectors/sqlite'
import { FortuneCookie } from './connectors/restApi'

const resolvers = {
    Query: {
        author(_, args) {
            return Author.find({ where: args })
        },
        allAuthors() {
            return Author.findAll()
        },
        post(_, args) {
            return Post.Find({ where: args })
        },
        allPosts() {
            return Post.findAll()
        },
        getFortuneCookie() {
            return FortuneCookie.getOne()
        },
    },
    Author: {
        posts(author) {
            return author.getPosts()
        },
    },
    Post: {
        author(post) {
            post.getAuthor()
        },
    },
}

export default resolvers
