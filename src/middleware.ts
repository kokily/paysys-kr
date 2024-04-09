export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/member',
    '/associate',
    '/general',
    '/menu',
    '/menu/:path*',
    '/cart',
    '/fronts',
  ],
};
