const feed = (parent, args, context) => context.prisma.links();
const link = (parent, args, context) => context.prisma.link({ id: args.id });

module.exports = {
  feed,
  link
};
