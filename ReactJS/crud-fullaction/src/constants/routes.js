export const ROUTES = {
  USER: {
    HOME: '/home',
    PRODUCT: {
      LIST: '/product',
      DETAIL: '/product/:id'
    },
    LOGIN: '/login',
    REGISTER: '/',
    PROFILE: '/profile'
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