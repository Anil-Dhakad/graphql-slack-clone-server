export default `

  type Message {
    id:Int!
    text:String!
    user:User!
    channel:Channel!
  }

  type Query {
    hi: String
  }
`;