export default {
  Query: {
    getUser: (parent, { id }, { models }) => {
      return models.User.findOne({ where: { id } })
    },
    allUsers: (parent, args, { models }) => {
      return models.User.findAll()
    }
  },
  Mutation: {
    createUser: (parent, args, { models }) => {
      return models.User.create(args)
    }
  }
}