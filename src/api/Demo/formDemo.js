import { getApiMethod } from '@/libs/util.js'

export const getFormData = (req) => getApiMethod('/demo/form', req)
