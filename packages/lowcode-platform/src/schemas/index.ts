import { Schema } from 'app-framework';

const schema = {
  ComponentType: 'Group',
  children: [
    {
      ComponentType: 'Title',
      Props: {
        text: 'Lowcode Platform'
      },
    }
  ],
} as Schema;

export default schema;