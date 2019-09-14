import faker from "faker";

import Author from "../models/author.model";
import Book from "../models/book.model";
import Publisher from "../models/publisher.model";

const resolvers = {
  Query: {
    allAuthors: async (args, { req }) => {
      return await Author.find();
    },
    allBooks: async (args, { req }) => {
      return await Book.find()
        .populate("author_id")
        .populate("publisher_id")
        .exec();
    },
    allPublisher: async (args, { req }) => {
      return await Publisher.find();
    },
    getAuthor: async (args, { req }) => {
      const author = await Author.findOne({ _id: args._id });

      if (!author) return console.log("The author does not exist!");

      return author;
    },
    getBook: async (args, { req }) => {},
    getPublisher: async (args, { req }) => {}
  },
  Mutation: {
    addAuthor: async (args, { req }) => {
      const author = new Author({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        country: faker.address.country()
      });

      return await author.save();
    },
    addBook: async (args, { req }) => {
      const book = new Book({
        title: faker.random.word(),
        isbn: faker.random.alphaNumeric(),
        synopsis: faker.lorem.text(),
        genres: faker.image.people(),
        publication_year: faker.date.recent()
      });

      return await book.save();
    },
    addPublisher: async (args, { req }) => {
      const publisher = new Publisher({
        name: faker.name.title(),
        foundation_year: faker.date.recent()
      });

      return await publisher.save();
    },
    updateAuthor: async (args, { req }) => {},
    updateBook: async (args, { req }) => {},
    updatePublisher: async (args, { req }) => {}
  }
};

export { resolvers };
