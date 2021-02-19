import { getParams } from '@/libs/util'

export const getFormData = (req) => {
  req = getParams(req.body)
  const data = {}
  return {
    code: 200,
    msg: 'ok',
    data
  }
}
