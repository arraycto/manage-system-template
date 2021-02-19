import * as user from './user'

export default [
  ['/admin/login', user.login],
  ['/admin/logout', user.logout],
  ['/admin/info', user.getUserInfo],
  ['/admin/permission', user.getAccess]
]
