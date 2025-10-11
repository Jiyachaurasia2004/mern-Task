const Todo = require('../models/todoModel.js');

module.exports.getTodos = async(req,res)=>{
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message:"Error fetching todos"},error);
    }
   
};

module.exports.createTodo = async(req,res)=>{
    try {
         const {title} = req.body;
    if(!title){
        return res.status(400).json({message:"Title required"});
    }
    const newTodo = await Todo.create({title});
    res.json(newTodo);
    } catch (error) {
        res.status(500).json({message:"Error creating todo"},error);
    }
   
}

module.exports.updateTodo = async(req,res)=>{
    const {id} = req.params;
    const {title} =req.body;
   try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid ID format' },error);
  }
   
}

module.exports.deleteTodo = async(req,res)=>{
    try {
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({message:"Todo deleted successfully"});
    } catch (error) {
       res.status(500).json({message:"Error deleting todo"},error);
}
    
}