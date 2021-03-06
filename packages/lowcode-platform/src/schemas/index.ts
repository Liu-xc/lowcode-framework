import { Schema } from 'app-framework';

// const schema = {
//   ComponentType: 'Group',
//   children: [
//     {
//       ComponentType: 'Title',
//       props: {
//         text: 'Lowcode Platform'
//       },
//     }
//   ],
// } as Schema;

const schema = {
  "ComponentType": "Container",
  "id": "rootContainer",
  "props": {
    "containerStyle": {
      "minHeight": "100%",
      // "backgroundColor": "pink",
      "width": "100%",
      "overflowY": "auto",
      "overflowX": "hidden"
    },
    "layoutInfo": [
      {
        "w": 14,
        "h": 20,
        "x": 0,
        "y": 0,
        "i": "6f077871-ae3d-4589-827e-2947b1ccdd02",
        "moved": false,
        "static": true,
        "isDraggable": false,
        "resizeHandles": [
          "s",
          "w",
          "e",
          "n",
          "se"
        ]
      }
    ],
    "layoutChildren": [
      {
        "ComponentType": "Container",
        "id": "6f077871-ae3d-4589-827e-2947b1ccdd02",
        "props": {
          "layoutInfo": [
            {
              "w": 12,
              "h": 16,
              "x": 0,
              "y": 0,
              "i": "660127b8-05de-4d3f-a83e-706fc2f40e1b",
              "moved": false,
              "static": true,
              "isDraggable": false,
              "resizeHandles": [
                "s",
                "w",
                "e",
                "n",
                "se"
              ]
            }
          ],
          "layoutChildren": [
            {
              "ComponentType": "Form",
              "id": "660127b8-05de-4d3f-a83e-706fc2f40e1b",
              "props": {
                "layoutInfo": [
                  {
                    "w": 8,
                    "h": 4,
                    "x": 0,
                    "y": 0,
                    "i": "792768b9-db16-438e-9b85-88385002e295",
                    "moved": false,
                    "static": true,
                    "isDraggable": false,
                    "resizeHandles": [
                      "s",
                      "w",
                      "e",
                      "n",
                      "se"
                    ]
                  }
                ],
                "layoutChildren": [
                  {
                    "ComponentType": "Input",
                    "id": "792768b9-db16-438e-9b85-88385002e295",
                    "props": {
                      "id": "792768b9-db16-438e-9b85-88385002e295"
                    }
                  }
                ],
                "layoutChildCompTypes": [
                  "Input"
                ],
                "id": "660127b8-05de-4d3f-a83e-706fc2f40e1b"
              }
            }
          ],
          "layoutChildCompTypes": [
            "Form"
          ],
          "id": "6f077871-ae3d-4589-827e-2947b1ccdd02"
        }
      }
    ],
    "layoutChildCompTypes": [
      "Container"
    ],
    "id": "rootContainer"
  }
};

export const layoutStore = {
  "readonly": true,
  "compInfo": {
    "rootContainer": {
      "ComponentType": "Container",
      "id": "rootContainer",
      "meta": {},
      "configProps": {
        "containerStyle": {
          "minHeight": "100%",
          // "backgroundColor": "pink",
          "width": "100%",
          "overflowY": "auto",
          "overflowX": "hidden"
        }
      },
      "layoutInfo": [
        {
          "w": 14,
          "h": 20,
          "x": 0,
          "y": 0,
          "i": "6f077871-ae3d-4589-827e-2947b1ccdd02",
          "moved": false,
          "static": true,
          "isDraggable": false,
          "resizeHandles": [
            "s",
            "w",
            "e",
            "n",
            "se"
          ]
        }
      ],
      "layoutChildCompTypes": [
        "Container"
      ],
      "childrenList": [
        "6f077871-ae3d-4589-827e-2947b1ccdd02"
      ]
    },
    "6f077871-ae3d-4589-827e-2947b1ccdd02": {
      "id": "6f077871-ae3d-4589-827e-2947b1ccdd02",
      "ComponentType": "Container",
      "configForm": {
        "fields": []
      },
      "droppingItem": {
        "w": 14,
        "h": 20
      },
      "parentId": "rootContainer",
      "layoutInfo": [
        {
          "w": 12,
          "h": 16,
          "x": 0,
          "y": 0,
          "i": "660127b8-05de-4d3f-a83e-706fc2f40e1b",
          "moved": false,
          "static": true,
          "isDraggable": false,
          "resizeHandles": [
            "s",
            "w",
            "e",
            "n",
            "se"
          ]
        }
      ],
      "layoutChildCompTypes": [
        "Form"
      ],
      "childrenList": [
        "660127b8-05de-4d3f-a83e-706fc2f40e1b"
      ]
    },
    "660127b8-05de-4d3f-a83e-706fc2f40e1b": {
      "id": "660127b8-05de-4d3f-a83e-706fc2f40e1b",
      "ComponentType": "Form",
      "configForm": {
        "fields": [
          {
            "type": "Input",
            "props": {
              "type": "",
              "placeholder": "?????????????????????"
            },
            "fieldProps": {
              "name": "title",
              "label": "????????????"
            }
          }
        ]
      },
      "droppingItem": {
        "w": 12,
        "h": 16
      },
      "parentId": "6f077871-ae3d-4589-827e-2947b1ccdd02",
      "layoutInfo": [
        {
          "w": 8,
          "h": 4,
          "x": 0,
          "y": 0,
          "i": "792768b9-db16-438e-9b85-88385002e295",
          "moved": false,
          "static": true,
          "isDraggable": false,
          "resizeHandles": [
            "s",
            "w",
            "e",
            "n",
            "se"
          ]
        }
      ],
      "layoutChildCompTypes": [
        "Input"
      ],
      "childrenList": [
        "792768b9-db16-438e-9b85-88385002e295"
      ]
    },
    "792768b9-db16-438e-9b85-88385002e295": {
      "id": "792768b9-db16-438e-9b85-88385002e295",
      "ComponentType": "Input",
      "configForm": {
        "fields": [
          {
            "type": "Input",
            "props": {
              "placeholder": "?????????????????????"
            },
            "fieldProps": {
              "name": "fieldLabel",
              "label": "????????????"
            }
          },
          {
            "type": "Input",
            "props": {
              "placeholder": "???????????????Key"
            },
            "fieldProps": {
              "name": "fieldKey",
              "label": "??????Key"
            }
          },
          {
            "type": "Select",
            "props": {
              "options": [
                {
                  "title": "number",
                  "value": "number"
                },
                {
                  "title": "password",
                  "value": "password"
                },
                {
                  "title": "textarea",
                  "value": "textarea"
                },
                {
                  "title": "text",
                  "value": "text"
                }
              ]
            },
            "fieldProps": {
              "label": "???????????????",
              "name": "type"
            }
          },
          {
            "type": "Input",
            "props": {
              "type": "",
              "placeholder": "??????????????????"
            },
            "fieldProps": {
              "label": "????????????",
              "name": "placeholder"
            }
          }
        ],
        "formProps": {
          "initialValues": {
            "type": "",
            "placeholder": ""
          }
        },
        "rules": [
          "message",
          "required",
          "pattern",
          "len",
          "max",
          "min"
        ]
      },
      "droppingItem": {
        "w": 4,
        "h": 4
      },
      "parentId": "660127b8-05de-4d3f-a83e-706fc2f40e1b"
    }
  }
};

export default schema;