import faker from "faker";

import Author from "../models/author.model";
import Book from "../models/book.model";
import Publisher from "../models/publisher.model";
import { TE } from "../middlewares/error";

const resolvers = {
  Query: {
    allAuthors: async (req, args) => {
      return await Author.find()
        .populate("book_id")
        .exec();
    },
    allBooks: async (req, args) => {
      return await Book.find()
        .populate("author_id")
        .populate("publisher_id")
        .exec();
    },
    allPublisher: async (req, args) => {
      return await Publisher.find();
    },
    getAuthor: async (req, args) => {
      const author = await Author.findOne({ _id: args._id }).populate(
        "book_id"
      );

      if (!author) return TE("The author does not exist!");

      return author;
    },
    getBook: async (req, args) => {
      const book = await Book.findOne({ _id: args._id })
        .populate("author_id")
        .populate("publisher_id");

      if (!book) return TE("The book does not exist!");

      return book;
    },
    getPublisher: async (req, args) => {
      const publisher = await Publisher.findOne({ _id: args._id });

      if (!publisher) return TE("The publisher does not exist!");

      return publisher;
    }
  },
  Mutation: {
    addAuthor: async (req, args) => {
      const author = new Author({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        country: faker.address.country(),
        book_id: args.authorInput.book_id
      });

      return await author.save();
    },
    addBook: async (req, args) => {
      const book = new Book({
        title: faker.random.word(),
        isbn: faker.random.alphaNumeric(),
        synopsis: faker.lorem.text(),
        genres: faker.image.people(),
        publication_year: faker.date.recent(),
        publisher_id: args.bookInput.publisher_id,
        author_id: args.bookInput.author_id
      });

      return await book.save();
    },
    addPublisher: async (req, args) => {
      const publisher = new Publisher({
        name: faker.name.title(),
        foundation_year: faker.date.recent()
      });

      return await publisher.save();
    },
    updateAuthor: async (req, args) => {
      const author = await Author.findOne({ _id: args._id });

      if (!author) return TE("The author does not exist!");

      await Author.findByIdAndUpdate(author._id, args.authorInput, {
        new: true,
        useFindAndModify: false
      });

      return await author.save();
    },
    updateBook: async (req, args) => {
      const book = await Book.findOne({ _id: args._id });

      if (!book) return TE("The book does not exist!");

      await Book.findByIdAndUpdate(book._id, args.bookInput, {
        new: true,
        useFindAndModify: false
      });

      return await book.save();
    },
    updatePublisher: async (req, args) => {
      const publisher = await Publisher.findOne({ _id: args._id });

      if (!publisher) return TE("The publisher does not exist!");

      await Publisher.findByIdAndUpdate(publisher._id, args.publisherInput, {
        new: true,
        useFindAndModify: false
      });

      return await publisher.save();
    }
  }
};

export default resolvers;
