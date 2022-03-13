import mongoose, { MongooseError, Document, HydratedDocument } from 'mongoose';

const { Schema: MongoSchema } = mongoose;
const { Types } = MongoSchema;

interface SchemaType {
  name: string;
  content: any;
  storeId: string;
}

type Doc = HydratedDocument<SchemaType>;

const schema = new MongoSchema<SchemaType>({
  name: Types.String,
  content: Types.Mixed,
  storeId: Types.String,
});

const SchemaModel = mongoose.model<SchemaType>('schema', schema);

export default SchemaModel;