import {_b, _c, _Ib, _lks} from '@/utils'

export const allBs = async function () {
  let bs = await _b.where({}).get()
  return bs
}