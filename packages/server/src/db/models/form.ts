import mongoose from 'mongoose';

const { Schema: MongoSchema } = mongoose;
const { Types } = MongoSchema;

interface FormType {
  formKey: string;
  formValue: any;
}

const schema = new MongoSchema<FormType>({
  formKey: Types.String,
  formValue: Types.Mixed
});

const FormModel = mongoose.model<FormType>('form', schema);

export default FormModel;
