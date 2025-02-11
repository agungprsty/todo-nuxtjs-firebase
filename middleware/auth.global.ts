export default defineNuxtRouteMiddleware( async (to, from) => {
  const user = await getCurrentUser();

  // Redirect to home if user already logged in
  if (user && to.name === 'login') {
    return navigateTo('/');
  }

  // Redirect to login if user is not logged in
  if (!user && to.name !== 'login') {
    return navigateTo('/login');
  }
})