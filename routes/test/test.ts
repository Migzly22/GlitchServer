import { Router } from 'express';

const router = Router();

// Example route for getting user data
router['get']('/users', (req, res) => {
  res.json({ message: 'List of users' });
});

// Another route for getting user by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `User with ID: ${id}` });
});

export default router;
