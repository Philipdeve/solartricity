import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
});

const Category = model('Category', categorySchema);

export default Category;