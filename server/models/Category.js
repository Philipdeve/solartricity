import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // Other category fields as needed
});

const Category = model('Category', categorySchema);

export default Category;