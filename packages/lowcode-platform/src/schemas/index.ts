import { Schema } from 'app-framework';

const schema = {
  ComponentType: 'Group',
  children: [
    {
      ComponentType: 'Title',
      props: {
        text: 'Lowcode Platform'
      },
    }
  ],
} as Schema;

// const schema = {
//   "ComponentType": "Container",
//   "id": "e4c88e5b-872b-41ae-8e83-eddea7263c9e",
//   "props": {
//     "layoutInfo": [
//       null
//     ]
//   },
//   "children": [
//     {
//       "ComponentType": "Form",
//       "id": "818da406-064d-4ff2-9e42-27ad7181b1d2",
//       "props": {
//         "layoutInfo": [
//           null
//         ]
//       },
//       "children": [
//         {
//           "ComponentType": "Input",
//           "id": "735e5417-a32f-4f12-af39-342709efa9c0"
//         }
//       ]
//     }
//   ]
// };

export default schema;