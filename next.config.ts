const nextConfig = {
  onDemandEntries: {
    // Ensure entries are not cached
    maxInactiveAge: 0,
  },
};
module.exports = nextConfig;
