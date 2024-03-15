import mongoose, { Document } from 'mongoose';

interface ITodo extends Document {
  text: string;
  completed: boolean;
  createdBy: string;
}

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

const Todo = mongoose.model<ITodo>('todos', todoSchema);

export default Todo;