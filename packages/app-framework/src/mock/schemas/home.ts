import { Schema } from 'render-engine';

const schema = {
  ComponentType: 'Group',
  Children: [
    {
      ComponentType: 'Title',
      Props: {
        text: 'HomePage'
      }
    }
  ]
} as Schema;

export default schema;