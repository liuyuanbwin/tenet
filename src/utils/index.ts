/* eslint-disable @typescript-eslint/prefer-for-of */
import { config } from '@/config'
import cloudbase from '@cloudbase/js-sdk'

const app = cloudbase.init({
	env: config.envId
})
const db = app.database()
const auth = app.auth({ persistence: 'local' })
const bills = db.collection('bills') // 订单列表
const cars = db.collection('cars') // 车辆列表
const linkmans = db.collection('linkmans') // 联系人列表
const corporates = db.collection('corporates') // 保险公司列表

// 获取登录状态
const loginState = () => {
	return new Promise((resolve, reject) => {
		auth
			.getLoginState()
			.then((loginState) => {
				if (loginState) {
					// 登录态有效
					resolve(true)
				} else {
					// 没有登录态，或者登录态已经失效
					resolve(false)
				}
			})
			.catch((err) => {
				reject(err)
			})
	})
}

// 邮箱登录
const emailLogin = (email: string, password: string) => {
	return new Promise((resolve, reject) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
// 新建车辆
const createCar = (query: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		cars
			.add({ ...query })
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
// 获取车辆列表
const getCars = (query: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		cars
			.where(query)
			.get()
			.then((res) => {
				if (res.data) {
					const getLinkmanInfo = async () => {
						let tempCars = []
						for (let i = 0; i < res.data.length; i++) {
							let car = res.data[i]
							let templinkmans = []
							if (car.linkman_ids) {
								for (let j = 0; j < car.linkman_ids.length; j++) {
									let tempLinkman = await linkmans.doc(car.linkman_ids[j]).get()
									if (tempLinkman.data && tempLinkman.data.length) {
										templinkmans.push(tempLinkman.data[0])
									}
								}
							}

							car.linkmans = templinkmans
							tempCars.push(car)
						}
						resolve(tempCars)
					}
					getLinkmanInfo()
				} else {
					resolve([])
				}
			})
			.catch((err) => {
				reject(err)
			})
	})
}

// 模糊搜索车辆
const getMatchCar = (reg: string): Promise<any> => {
	const R = db.RegExp as any
	let treg = new R({ regexp: `${reg}`, options: 'i' })
	return new Promise((resolve, reject) => {
		cars
			.where({
				no: treg // /88/i // treg // /`${reg}`/ // new db.RegExp({ regexp: `/${reg}/`, options: 'i' })
			})
			.get()
			.then((res) => {
				resolve(res)
			})
			.catch((err) => reject(err))
	})
}
// 模糊搜索联系人
const getMatchLinkman = (reg: string): Promise<any> => {
	if (reg === '') {
		return new Promise((resolve, reject) => {
			linkmans
				.get()
				.then((res) => {
					resolve(res)
				})
				.catch((err) => reject(err))
		})
	}
	const R = db.RegExp as any
	let treg = new R({ regexp: `${reg}`, options: 'i' })
	return new Promise((resolve, reject) => {
		linkmans
			.where({ name: treg })
			.get()
			.then((res) => {
				resolve(res)
			})
			.catch((err) => reject(err))
	})
}
// 新建联系人
const createLinkman = (query: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		linkmans
			.add({
				...query
			})
			.then((res) => resolve(res))
			.catch((err) => reject(err))
	})
}
// 获取联系人列表
const getLinkmans = (query: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		linkmans
			.where(query)
			.get()
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

const getCorporates = (query: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		corporates
			.where(query)
			.get()
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
// 新建订单
const createBill = (query: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		bills
			.add({ ...query })
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

// 获取订单列表
const getBills = (query: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		bills
			.where(query)
			.get()
			.then((res) => {
				console.log('%cindex.ts line:84 res', 'color: #26bfa5;', res)
				if (res.data) {
					const getCarInfo = async () => {
						let tempbills = []
						for (let i = 0; i < res.data.length; i++) {
							let bill = res.data[i]
							let car_info = await cars.doc(bill.car_id).get()
							console.log('%cindex.ts line:105 car_info', 'color: #26bfa5;', car_info)
							if (car_info.data && car_info.data.length) {
								bill.car_info = car_info.data[0]
							}
							let templinkmans = []
							for (let j = 0; j < bill.linkman_ids.length; j++) {
								let tempLinkman = await linkmans.doc(bill.linkman_ids[j]).get()
								console.log(
									'%cindex.ts line:115 tempLinkman',
									'color: white; background-color: #26bfa5;',
									tempLinkman
								)
								if (tempLinkman.data && tempLinkman.data.length) {
									templinkmans.push(tempLinkman.data[0])
								}
							}
							bill.linkmans = templinkmans
							tempbills.push(bill)
						}
						resolve(tempbills)
					}
					getCarInfo()
				} else {
					resolve(res)
				}
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export {
	app,
	emailLogin,
	loginState,
	getBills,
	getCars,
	getMatchCar,
	getMatchLinkman,
	getCorporates,
	createBill,
	createCar,
  createLinkman,
  getLinkmans
}
//   brand: "nissan"
// check_date: {$date: 1443698575000}
// create_date: {$date: 1608204257064}
// engine_no: "000000"
// frame_no: "111111"
// linkman_ids: ["1"]
// model: "teana"
// no: "京A888888"
// owner_id: "85ff8afa5fdb3f5d000eaf427a9a34c2"
// type: "under5"
