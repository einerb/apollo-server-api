import faker from "faker";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Author from "../models/author.model";
import Book from "../models/book.model";
import Publisher from "../models/publisher.model";
import User from "../models/user.model";
import config from "../config/";
import { TE } from "../middlewares/error";

const resolvers = {
  Query: {
    allAuthors: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

      return await Author.find()
        .populate("book_id")
        .exec();
    },
    allBooks: async (parent, args, context) => {
      const filter = args.parameterInput.filter;
      const id = args.parameterInput.id;
      const page = args.parameterInput.page;
      let query;

      if (filter === undefined || filter === "") {
        query = await Book.find()
          .limit(page)
          .sort({
            publication_year: args.parameterInput.order,
            title: args.parameterInput.order
          })
          .populate("author_id")
          .populate("publisher_id");
      } else {
        query = await Book.find({
          $or: [{ title: filter }, { publication_year: filter }]
        })
          .limit(page)
          .sort({
            publication_year: args.parameterInput.order,
            title: args.parameterInput.order
          })
          .populate("author_id")
          .populate("publisher_id");
      }

      if (id) {
        query = await Book.find({
          $or: [{ author_id: id }, { publisher_id: id }]
        })
          .limit(page)
          .sort({
            publication_year: args.parameterInput.order,
            title: args.parameterInput.order
          })
          .populate("author_id")
          .populate("publisher_id");
      }

      return query;
    },
    allPublisher: async (parent, args, context) => {
      return await Publisher.find();
    },
    getAuthor: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

      const author = await Author.findOne({ _id: args._id }).populate(
        "book_id"
      );

      if (!author) return TE("The author does not exist!");

      return author;
    },
    getBook: async (parent, args, context) => {
      const book = await Book.findOne({ _id: args._id })
        .populate("author_id")
        .populate("publisher_id");

      if (!book) return TE("The book does not exist!");

      return book;
    },
    getPublisher: async (parent, args, context) => {
      const publisher = await Publisher.findOne({ _id: args._id });

      if (!publisher) return TE("The publisher does not exist!");

      return publisher;
    }
  },
  Mutation: {
    generateToken: async (parent, args, context) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        return TE("User does not exist!");
      }
      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) {
        return TE("Incorrect password!");
      }

      const token =
        "Bearer " +
        jwt.sign(
          { userId: user.id, username: user.username },
          config.jwt_encryption,
          {
            expiresIn: "1h"
          }
        );

      return {
        userId: user.id,
        username: user.username,
        token: token,
        tokenExpiration: 1
      };
    },
    addAuthor: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

      const author = new Author({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        country: faker.address.country(),
        book_id: args.authorInput.book_id
      });

      return await author.save();
    },
    addBook: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

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
    addPublisher: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

      const publisher = new Publisher({
        name: faker.name.title(),
        foundation_year: faker.date.recent()
      });

      return await publisher.save();
    },
    updateAuthor: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

      const author = await Author.findOne({ _id: args._id });

      if (!author) return TE("The author does not exist!");

      await Author.findByIdAndUpdate(author._id, args.authorInput, {
        new: true,
        useFindAndModify: false
      });

      return await author.save();
    },
    updateBook: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

      const book = await Book.findOne({ _id: args._id });

      if (!book) return TE("The book does not exist!");

      await Book.findByIdAndUpdate(book._id, args.bookInput, {
        new: true,
        useFindAndModify: false
      });

      return await book.save();
    },
    updatePublisher: async (parent, args, context) => {
      const authenticated = context.req.headers.authorization;

      if (!authenticated) {
        return TE("There is no valid token!");
      }

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
