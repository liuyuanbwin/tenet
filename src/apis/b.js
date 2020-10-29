import { _b, _c, _Ib, _lks } from '@/utils'

export const allBs = async function () {
  let bs = await _b.where({}).get()
  let _bs = []
  bs.data.forEach(async (_b) => {
    let lks = await _c
      .where({
        _id: _b.cId
      })
      .get()
    _bs.push({ ...lks.data[0], ..._b })
    console.log(_bs)
  })
  return _bs
}
