export default `

  type User {
    id:Int!
    username:String!
    email:String!
    teams:[Team!]!
  }

  type Query {
    getUser(id:Int!):Users!
    allUsers(id:Int?):[Users!]!
  }

  type Mutation {
    createUser(username:String!, email:String!, password:String!):User!
  }
`;