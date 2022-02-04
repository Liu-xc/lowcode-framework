import { Schema } from 'app-framework';

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
        age: 1
      }
    }
  ]
} as Schema;

export default schema;