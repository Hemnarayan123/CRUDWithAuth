import { List} from '../models/list.model.js';
import { User } from '../models/user.model.js';





// ..........................................................Add a new todo
// http://localhost:8000/api/v2/add-todos
export const addTodo = async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const list = new List({title, description, users: existingUser._id });

      await list.save();
      existingUser.list.push(list._id);
      await existingUser.save().then(() => {
        res.status(201).json({ list });
      })
      
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// .................................................................Update a todo
// ​http://localhost:8000/api/v2/update-todos/66505785b22dff802fb57ef2

export const updateTodo = async (req, res) => {
  try {
    const { title, description, email } = req.body; 
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const updateList = await List.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true }
      );

      if (updateList) {
        res.status(200).json({ message: "Updated Todo" });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ...........................................................Delete a todo
// http://localhost:8000/api/v2/delete-todos/665028efc540aca2b7487359

export const deleteTodo = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOneAndUpdate({ email}, {$pull: {list: req.params.id}});  // if you delete - just delete the list data only but no in user , so for thsid we use findOneAndUpdate to also delete from the users

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() => 
      res.status(200).json({ message:"Deleted Todo"}))
    }
        
      
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}










//.......................................................... Get todos by user id
// ​​http://localhost:8000/api/v2/get-todos/665028efc540aca2b7487359

export const getTodos = async (req, res) => {
  try {
    const todoList = await List.find({ users: req.params.id }).sort({ createdAt: -1 }); // 'list' to filter by user ID
   
    if (todoList.length > 0) {
      res.status(200).json({ todoList });

    } else {
      res.status(404).json({ 
        message: 'User not found or no tasks' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

















