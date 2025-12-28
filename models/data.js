const tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "High",
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-20')
  },
  {
    id: 2,
    title: "Review code changes",
    description: "Review pull requests from the team",
    completed: false,
    priority: "Medium",
    createdAt: new Date('2024-11-18'),
    updatedAt: new Date('2024-11-22')
  },
  {
    id: 3,
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    completed: true,
    priority: "Low",
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-22')
  },
  {
    id: 4,
    title: "Fix bug in authentication",
    description: "Fix JWT token expiration issue",
    completed: false,
    priority: "High",
    createdAt: new Date('2024-11-22'),
    updatedAt: new Date('2024-11-22')
  },
  {
    id: 5,
    title: "Database optimization",
    description: "Optimize database queries for better performance",
    completed: false,
    priority: "Medium",
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-22')
  }
];

module.exports = tasks;
