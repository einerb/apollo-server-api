const typeDefs = `
"Types"
type Book {
  id: String!
  title: String!
  isbn: String!
  synopsis: String
  genres: String
  publication_year: String!
  description: String!
  authorName: String!
}
type Author {
  id: String!
  first_name: String!
  last_name: String
  country: String
}
type Publisher {
  id: String!
  name: String!
  foundation_year: String!
}

"Querys"
type Query {
  books: [Book]
}

`;

const resolvers = {};

export { typeDefs, resolvers };
