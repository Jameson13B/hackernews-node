const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const signup = async (parent, args, context, info) => {
  // Hash password
  const password = await bcrypt.hash(args.password, 10);
  // Create user
  const user = await context.prisma.createUser({ ...args, password });
  // Create token
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
};

const login = async (parent, args, context) => {
  // Find user
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('Invalid Password');
  }
  // Verify password
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid Password');
  }
  // Create token
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
};

const post = async (parent, args, context) => {
  // Validate user
  const userId = getUserId(context);
  // Create new link
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
};

const updateLink = async (parent, args, context) => {
  // Validate user
  const userId = getUserId(context);
  // Update link
  return context.prisma.updateLink({
    data: {
      url: args.url,
      description: args.description
    },
    where: { id: args.id }
  });
};

const deleteLink = async (parent, args, context) => {
  // Validate user
  const userId = getUserId(context);
  // Delete link
  return context.prisma.deleteLink({ id: args.id });
};

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink
};
