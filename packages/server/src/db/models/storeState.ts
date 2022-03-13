import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;

const {
  Types
} = Schema;

const schema = new Schema({
  name: Types.String,
  content: Types.Mixed
});

const StateModel = mongoose.model('state', schema);

export default StateModel;