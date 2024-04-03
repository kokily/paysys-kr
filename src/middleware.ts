export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/member', '/associate', '/general', '/cart', '/fronts'],
};
