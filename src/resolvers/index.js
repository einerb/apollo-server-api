const resolvers = {
  Query: {
    getBook: async () => {},
    allBooks: async () => {},
    getAuthor: async () => {},
    allAuthors: async () => {},
    getPublisher: async () => {},
    allPublisher: async () => {}
  },
  Mutation: {
    addAuthor: () => {},
    updateAuthor: () => {},
    addBook: async () => {},
    updateBook: async () => {},
    addPublisher: async () => {},
    updatePublisher: async () => {}
  }
};

export { resolvers };
