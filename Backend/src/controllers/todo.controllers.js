import { List as Todo } from '../models/list.model.js';
import { User } from '../models/user.model.js';





// ..........................................................Add a new todo
export const addTodo = async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const todo = new Todo({
        title, 
        description, 
        users: existingUser._id // Using 'list' to store the user ID reference
      });

      await todo.save();
      existingUser.list.push(todo._id);
      await existingUser.save(); 
      
      res.status(201).json({ todo });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








// //.......................................................... Get todos by user id
// export const getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ users: req.params.id }).sort({ createdAt: -1 }); // 'list' to filter by user ID
   
//     if (todos.length > 0) {
//       res.status(200).json({ todos }); // 200 is the standard status code for successful GET requests

//     } else {
//       res.status(404).json({ 
//         message: 'User not found or no tasks' 
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ 
//       message: error.message 
//     });
//   }
// };








// // .................................................................Update a todo
// export const updateTodo = async (req, res) => {
//   try {
//     const { title, description } = req.body; 
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       req.params.id, 
//       { title, description },
//       { new: true }
//     );

//     if (updatedTodo) {
//       res.status(200).json({ 
//         message: "Updated", 
//         updatedTodo 
//       });

//     } else {
//       res.status(404).json({ message: 'Todo not found' });
//     }

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }








// // ...........................................................Delete a todo
// export const deleteTodo = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

//       if (deletedTodo) {
//         existingUser.list.pull(req.params.id); 
//         await existingUser.save(); 
        
//         res.status(200).json({ message: "Deleted Todo" });

//       } else {
//         res.status(404).json({ message: 'Todo not found' });
//       }

//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
    
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
