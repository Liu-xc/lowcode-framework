import { Schema } from 'render-engine';

const schema = {
  ComponentType: 'Group',
  Children: [
    {
      ComponentType: 'Title',
      Props: {
        $text$: '`${name} is ${age}`'
      },
      MockContext: {
        name: 'yanglulu',
        age: 12
      }
    }
  ]
} as Schema;

export default schema;