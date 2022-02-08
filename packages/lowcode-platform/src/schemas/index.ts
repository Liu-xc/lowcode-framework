import { Schema } from 'app-framework';

const schema = {
  ComponentType: 'Group',
  children: [
    {
      ComponentType: 'Title',
      Props: {
        text: 'yanglulu is 1'
      },
    }
  ],
} as Schema;

export default schema;