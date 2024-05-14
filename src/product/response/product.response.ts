export const unauthorizedResponse = {
  status: 401,
  schema: {
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  },
};

export const createProductResponse = {
  succes: {
    status: 201,
    schema: {
      example: {
        handle: 'cola-glitter-23-grs',
        title: 'COLA GLITTER 23 GRS',
        description:
          'Para hacer pegaduras, contornos, decorar y pintar sobre papel, papel cartón y cartulina. Posee un brillo intenso con glitter. Lavable (no mancha las ropas).',
        sku: '60870131001',
        grams: 100,
        stock: 1013,
        price: 1161,
        compare_price: 1290,
        barcode: '7891153003689',
        id: '1a524174-b749-4691-aacd-e86362a74373',
      },
    },
  },
  badRequest: { status: 400, description: 'bad request' },
};

export const getProductResponse = {
  succes: {
    status: 200,
    schema: {
      example: {
        response: [
          {
            id: '1a524174-b749-4691-aacd-e86362a74373',
            handle: 'cola-glitter-23-grs',
            title: 'COLA GLITTER 23 GRS',
            description:
              'Para hacer pegaduras, contornos, decorar y pintar sobre papel, papel cartón y cartulina. Posee un brillo intenso con glitter. Lavable (no mancha las ropas).',
            sku: '60870131001',
            grams: 100,
            stock: 1013,
            price: 1161,
            compare_price: 1290,
            barcode: '7891153003689',
          },
        ],
      },
    },
  },
  badRequest: { status: 400, description: 'bad request' },
};

export const updateProductResponse = {
  succes: {
    status: 200,
    schema: {
      example: {
        ok: true,
        message:
          'product 1a524174-b749-4691-aacd-e86362a74373 has been updated',
      },
    },
  },
  badRequest: { status: 400, description: 'bad request for update' },
};

export const deleteProductResponse = {
  succes: {
    status: 200,
    schema: {
      example: {
        ok: true,
        message:
          'product 1a524174-b749-4691-aacd-e86362a74373 has been deleted',
      },
    },
  },
  badRequest: { status: 400, description: 'bad request for delete' },
};
