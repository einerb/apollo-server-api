import { gql } from "apollo-server-express";

const typeDefs = gql`
  "Types"
  type Auth {
    userId: ID!
    username: String!
    token: String!
    tokenExpiration: Int!
  }
  type Author {
    _id: ID!
    first_name: String
    last_name: String
    country: String
    book_id: [Book]
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

  "Input"
  input AuthorInput {
    first_name: String
    last_name: String
    country: String
    book_id: [String]
  }
  input BookInput {
    title: String
    isbn: String!
    synopsis: String
    genres: String
    publication_year: String
    publisher_id: String
    author_id: [String]
  }
  input PublisherInput {
    name: String
    foundation_year: String
  }
  input ParameterInput {
    order: String
    filter: String
    id: ID
    page: Int
  }

  "Query"
  type Query {
    login(username: String!, password: String!): Auth!

    allAuthors: [Author]!
    getAuthor(_id: ID!): Author!

    "Sort by title and year (asc or desc) Filter by title, author, publisher and year y Pagination"
    allBooks(parameterInput: ParameterInput): [Book]!
    getBook(_id: ID!): Book!

    allPublisher: [Publisher]!
    getPublisher(_id: ID!): Publisher!
  }

  "Mutations"
  type Mutation {
    addAuthor(authorInput: AuthorInput): Author
    updateAuthor(_id: ID!, authorInput: AuthorInput): Author

    addBook(bookInput: BookInput): Book
    updateBook(_id: ID!, bookInput: BookInput): Book

    addPublisher(publisherInput: PublisherInput): Publisher
    updatePublisher(_id: ID!, publisherInput: PublisherInput): Publisher
  }
`;

export default typeDefs;
