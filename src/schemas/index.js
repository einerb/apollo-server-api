const typeDefs = `
"Types"
type Author {
  _id: ID!
  first_name: String
  last_name: String
  country: String
}
type Book {
  _id: ID!
  title: String
  isbn: String!
  synopsis: String
  genres: String
  publication_year: String
  publisher_id: Publisher
  author_id: [Author]
}
type Publisher {
  _id: ID!
  name: String
  foundation_year: String
}

"Query"
type Query {
  getAuthor(_id: ID!): Author!
  allAuthors: [Author]!

  getBook(_id: ID!): Book!
  allBooks: [Book]!

  getPublisher(_id: ID!): Publisher!
  allPublisher: [Publisher]!
}

"Mutations"
type Mutation {
  addAuthor(first_name: String, last_name: String, country: String): Author
  updateAuthor(_id: ID!, first_name: String, last_name: String, country: String): Author

  addBook(title: String, isbn: String!, synopsis: String, genres: String, publication_year: String, publisher_id: String!, author_id: String!): Book
  updateBook(_id: ID!, title: String, isbn: String!, synopsis: String, genres: String, publication_year: String): Book

  addPublisher(name: String, foundation_year: String): Publisher
  updatePublisher(_id: ID!, name: String, foundation_year: String): Publisher
}
`;

export { typeDefs };
