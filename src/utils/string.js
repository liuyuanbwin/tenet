const billTypes = [
	{ index: 1, type: 'check_car', title: '验车' },
	{ index: 2, type: 'commercial_insurance', title: '商业保险' },
	{ index: 3, type: 'force_insurance', title: '交强险' }
]

const vehicleType = [
	{ index: 1, type: 'under5', title: '5座以下客车' },
	{ index: 2, type: 'beyond5', title: '5座以上客车' },
	{ index: 3, type: 'trunk', title: '卡车' },
	{ index: 4, type: 'other', title: '其他' }
]

const billTypeTitle = (type) => {
	let types = billTypes.filter((item) => item.type == type)
	return types[0]
}

export { billTypes, vehicleType, billTypeTitle }
