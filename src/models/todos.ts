import mongoose, { Document } from 'mongoose';

interface ITodo extends Document {
  text: string;
  isCompleted: boolean;
  createdBy: string;
}

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: "ObjectId",
    ref: "Users",
    required: false,
  }
}, {
  timestamps: true
});

const Todo = mongoose.model<ITodo>('todos', todoSchema);

export default Todo;