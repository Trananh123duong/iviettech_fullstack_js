export const ROUTES = {
  USER: {
    HOME: '/',
    PRODUCT: {
      LIST: '/product'
    },
    LOGIN: '/login',
    REGISTER: '/register'
  },
  ADMIN: {
    DASHBOARD: '/admin',
    PRODUCT: {
      MANAGER: '/admin/product',
      CREATE: '/admin/product/create',
      UPDATE: '/admin/product/:id/update'
    },
    BRAND: {
      MANAGER: '/admin/brand',
      CREATE: '/admin/brand/create',
      UPDATE: '/admin/brand/:id/update'
    },
    CATEGORY: {
      MANAGER: '/admin/category',
      CREATE: '/admin/category/create',
      UPDATE: '/admin/category/:id/update'
    }
  }
}