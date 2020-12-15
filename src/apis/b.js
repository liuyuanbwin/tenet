import { _b, _c, _Ib, _lks } from '@/utils'

export const allBs = async function () {
  let bs = await _b.where({}).get()
  let _bs = []
  // bs.data && bs.data.forEach(async (_b) => {
  //   Promise.all
  //   let cs = await _c
  //     .where({
  //       _id: _b.cId
  //     })
  //     .get()
  //   let mks = await _lks.where({_id:_b.mId}).get()
  //   console.log('%cb.js line:13 lks', 'color: #26bfa5;', mks);
  //   _bs.push({ ..._b,ms:mks.data,cs:cs.data})
  //   console.log(_bs)
  // })
  if (!bs || !bs.data) {
    return []
  }
  await Promise.all(
    bs.data.map(async (_b) => {
      let cs = await _c
        .where({
          _id: _b.cId
        })
        .get()
      let mks = await _lks.where({ _id: _b.mId }).get()
      console.log('%cb.js line:13 lks', 'color: #26bfa5;', mks)
      _bs.push({ ..._b, ms: mks.data, cs: cs.data })
    })
  )
  return _bs
}
