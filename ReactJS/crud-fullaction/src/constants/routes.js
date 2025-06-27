export const ROUTES = {
  USER: {
    HOME: '/',
    PRODUCT: {
      LIST: '/product'
    }
  },
  ADMIN: {
    DASHBOARD: '/admin',
    PRODUCT: {
      MANAGER: '/admin/product',
      CREATE: '/admin/product/create',
      UPDATE: '/admin/product/:id/update'
    }
  }
}