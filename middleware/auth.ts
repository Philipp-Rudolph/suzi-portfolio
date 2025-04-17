function isAuthenticated(): boolean { return false }
export default defineNuxtRouteMiddleware((_to, _from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
