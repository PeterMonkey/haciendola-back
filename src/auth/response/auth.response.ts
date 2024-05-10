export const registerResponse = {
  succes: {
    status: 201,
    schema: {
      example: {
        token: 'eyjgd743uun7f73u4nu3f7s7d7fsjsjkfj4747fnr278r2fsfgog9oy5idi8h',
      },
    },
  },
  badRequest: {
    status: 400,
    schema: {
      example: {
        message: 'new user could not be created',
        statusCode: 400,
      },
    },
  },
};

export const loginResponse = {
  succes: {
    status: 201,
    schema: {
      example: {
        token: 'eyjgd743uun7f73u4nu3f7s7d7fsjsjkfj4747fnr278r2fsfgog9oy5idi8h',
      },
    },
  },
  unauthorized: {
    status: 401,
    schema: {
      example: {
        response: {
          message: 'Invalid credential',
          error: 'Unauthorized',
          statusCode: 401,
        },
        status: 401,
        options: {},
        message: 'Invalid credential',
        name: 'UnauthorizedException',
      },
    },
  },
};
