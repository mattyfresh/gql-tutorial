import casual from 'casual'

const mocks = {
  // any query for an Int will fallback to this if not specified in the type, EG Author ID
  Int: () => Math.floor(Math.random() * 100000),
  Query: () => ({
    author: (root, args) => {
      const { firstName, lastName } = args
      return { firstName, lastName }
    },
  }),
  Author: () => ({
    firstName: casual.first_name,
    lastName: casual.last_name,
  }),
  Post: () => ({
    title: casual.title,
    text: casual.sentences(2),
  }),
}

export default mocks
