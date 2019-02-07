// DB connectors
import Sequelize from 'sequelize'
import casual from 'casual'
import { times } from 'lodash'

// init db with no username or password
const db = new Sequelize('blog_db', null, null, {
    dialect: 'sqlite',
    storage: './blog.sqlite',
})

// define our models
const AuthorModel = db.define('author', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
})

const PostModel = db.define('post', {
    title: { type: Sequelize.STRING },
    text: { type: Sequelize.STRING },
})

// define relationships
AuthorModel.hasMany(PostModel)
PostModel.belongsTo(AuthorModel)

casual.seed(789)
db.sync({ force: true }).then(() => {
    times(10, () => {
        return AuthorModel.create({
            firstName: casual.first_name,
            lastName: casual.last_name,
        }).then(author => {
            times(2, () => {
                // create posts for each author
                // this **magic method** is dependent on the name given in db.define('post')
                return author.createPost({
                    title: casual.title,
                    text: casual.sentences(3),
                })
            })
        })
    })
})

const Author = db.models.author
const Post = db.models.post

export { Author, Post }
