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
        name: 'alice',
        age: 13
      }
    }
  ]
} as Schema;

export default schema;