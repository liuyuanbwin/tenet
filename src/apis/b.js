import { _b, _c, _Ib, _lks } from '@/utils'

export const allBs = async function () {
  let bs = await _b.where({}).get()
  console.log('%cb.js line:5 bs', 'color: #26bfa5;', bs);
  let _bs = []
  let css = await _c.where({}).get()
  console.log('%cb.js line:8 css', 'color: #26bfa5;', css);
  await Promise.all(bs.data.map(async (_b) => {

      let cs = await _c
        .where({
          _id: _b.car_id
        })
        .get()
      console.log('%cb.js line:15 cs', 'color: #26bfa5;', cs);
      let mks = await _lks.where({ _id: _b.linkman_id }).get()
      console.log('%cb.js line:16 mks', 'color: #26bfa5;', mks);
      console.log('%cb.js line:13 lks', 'color: #26bfa5;', mks)
      _bs.push({ ..._b, ms: mks.data, cs: cs.data })
    })
  )
  console.log('%cb.js line:20 _bs', 'color: #26bfa5;', _bs);
  return _bs
}
