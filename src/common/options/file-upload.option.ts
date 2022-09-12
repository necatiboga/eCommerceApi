export const fileUploadOption = {
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable:false
        },
      },
    },
  }