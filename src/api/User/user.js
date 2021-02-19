import { getApiMethod } from '@/libs/util.js'

export const login = (req) => getApiMethod('/admin/login', req)
export const getUserInfo = (req) => getApiMethod('/admin/info', req)
export const logout = (req) => getApiMethod('/admin/logout', req)
export const getAccess = (req) => getApiMethod('/admin/permission', req)
