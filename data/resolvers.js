import casual from 'casual'

const resolvers = {
  Query: {
    author(_, args) {
      const { firstName, lastName } = args
      return { id: casual.uuid, firstName, lastName }
    },
    post(_, args) {
      return { id: casual.uuid, title: args.title, text: casual.text }
    },
  },
}

export default resolvers
