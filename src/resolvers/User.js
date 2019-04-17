const links = (parent, arges, context) => {
  return context.prisma.user({ id: parent.id }).links();
};

module.exports = {
  links
};
