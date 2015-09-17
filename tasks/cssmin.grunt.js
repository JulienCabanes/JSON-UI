module.exports = {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  dist: {
    files: {
      'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
    }
  }
};
