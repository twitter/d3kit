module.exports = {
  build: {
    description: 'Build D3Kit distribution package.',
    tasks: [
      'clean:dist',
      'requirejs:dist',
      'concat:dist',
      'uglify:dist',
      'clean:tmp'
    ]
  },
  clear: {
    description: 'Remove all distribution files.',
    tasks: ['clean:dist']
  },
  clearDev: {
    description: 'Remove all dependencies and build tools.',
    tasks: ['clean:dep']
  },

  'default': {
    description: 'Watch for changes and trigger builds.',
    tasks: ['watch']
  },

  // Tasks related to test
  'test': ['karma:dev'],
  'test-ci': ['karma:ci']
};