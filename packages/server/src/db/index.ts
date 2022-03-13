import SchemaModel from "./models/schema";
import StateModel from "./models/storeState";

const checkExistence = async (name: string) => {
  const checkSchema = SchemaModel.findOne({ name });
  const checkState = StateModel.findOne({ name });
  return await Promise.all([checkSchema, checkState]).then(
    ([schemaDoc, stateDoc]) => {
      if (!schemaDoc && stateDoc) {
        StateModel.deleteOne(stateDoc);
        return false;
      } else if (!schemaDoc && !stateDoc) {
        return false;
      }
      return true;
    }
  );
}

export {
  SchemaModel,
  StateModel,
  checkExistence
};