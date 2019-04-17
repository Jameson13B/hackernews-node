// Implement the GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => dummyLinks,
    link: (parent, args) => {
      let link = dummyLinks.find(el => {
        return el.id === args.id;
      });
      return link;
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      dummyLinks.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let link = dummyLinks.find(el => {
        return el.id === args.id;
      });
      if (args.url) {
        link.url = args.url;
      }
      if (args.description) {
        link.description = args.description;
      }
      return link;
    },
    deleteLink: (parent, args) => {
      let links = dummyLinks.filter(link => {
        return link.id !== args.id;
      });
      dummyLinks = links;
      return args.id;
    }
  }
};
// Dummy data
let dummyLinks = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial GraphQL'
  }
];
let idCount = dummyLinks.length;

module.exports = resolvers;
