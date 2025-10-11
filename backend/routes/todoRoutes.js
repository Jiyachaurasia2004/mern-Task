const express = require('express');
const router = express.Router();
const {getTodos, createTodo, updateTodo, deleteTodo} = require('../controllers/todoController.js');

router.get('/', getTodos);
router.post('/todos', createTodo);
router.put('/:id',updateTodo);
router.delete('/:id',deleteTodo);

module.exports = router;