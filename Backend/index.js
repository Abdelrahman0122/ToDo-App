const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const { log } = require('console');


const prisma = new PrismaClient()
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    })
);

async function main() {
   // const user = await prisma.user.create({ data : { name: 'Alice3' , email: 'Alice3@gmail.com' , password: "123" } })
   // console.log(user)
}

 // The Registration Route
  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await prisma.user.create({ data: { name, email, password } });
      res.json({ message: 'User registered successfully', user });
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
  
  // The Get Users Route
  app.get('/', async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: 'Failed to get users' });
    }
  });

    // The Login Route
    app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const passwordMatch = password === user.password;
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful!', user });
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: 'Failed to log in' });
    }
  });


  // post a todo
   app.post("/todos", async (req, res) => {
    const { title, description, isChecked, userId } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const todo = await prisma.mytodo.create({
        data: {
          title,
          description,
          isChecked,
          userId: user.id,
        },
      });
      res.json({ message: "Todo created successfully", todo });
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: "Failed to create todo" });
    }
  });



  // Get all todos for a user
  app.get('/todos/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const todos = await prisma.mytodo.findMany({ where: { userId } });
      res.json(todos);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: "Failed to get todos for user" });
    }
  });

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await prisma.mytodo.findUnique({ where: { id } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    await prisma.mytodo.delete({ where: { id } });
    res.json({ message: 'Todo deleted successfully' });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Update the isChecked field of a todo by ID
app.put('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { isChecked } = req.body;
  try {
    const todo = await prisma.mytodo.findUnique({ where: { id } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    const updatedTodo = await prisma.mytodo.update({
      where: { id },
      data: { isChecked },
    });
    res.json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});





app.listen(port, () => {
    console.log('Server is running on port 3000.....');
});