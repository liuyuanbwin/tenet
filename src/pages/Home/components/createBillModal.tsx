import React, { useState, useEffect, Fragment } from 'react'
import {
	Modal,
	Steps,
	AutoComplete,
	Input,
	Divider,
	Descriptions,
	Button,
	InputNumber,
	Form,
	TreeSelect,
	Select,
	Cascader,
	DatePicker,
	Switch,
	Radio
} from 'antd'
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons'
import { getMatchCar, getCorporates } from '@/utils/index'
import { billTypes } from '@/utils/string'
import './createBillModal.less'
const { Step } = Steps

const CreateBillModal = (props: any) => {
	const [ step, setStep ] = useState(0) //  0 选择车辆,3 订单配置 , 1选择联系人,4 订单生成
	const [ carOptions, setCarOptions ] = useState<{ value: string }[]>([])
	const [ car, setCar ] = useState<any>({})
  const [ corporates, setCorporates ] = useState<{ _id: string; name: string }[]>([])
  
  const [form] = Form.useForm()

	useEffect(() => {
		const initData = async () => {
			let result = await getCorporates({})
			console.log('%ccreateBillModal.tsx line:34 result', 'color: #26bfa5;', result)
			setCorporates(result.data)
		}
		initData()
		return () => {}
	}, [])

	const onCarSelect = (e: any, option: any) => {
		setCar(option)
		// setStep(1)
	}
	const onHandleCarSearch = async (e: any) => {
		console.log('%ccreateBillModal.tsx line:13 e', 'color: #26bfa5;', e)
		let result = await getMatchCar(e+'')
		console.log('%ccreateBillModal.tsx line:16 result', 'color: #26bfa5;', result)
		result.data = result.data.map((car: any) => {
			car.value = car.no
			return car
		})
		setCarOptions(result.data)
  }
  
  const onFinish = (values:any) => {
    console.log('%ccreateBillModal.tsx line:59 values', 'color: #26bfa5;', values);
  }
	return (
		<Modal
			width="800"
			visible={true}
			title="sssfsf"
			wrapClassName="create-bill-modal-body"
			onCancel={props.onClose}
		>
			<Steps current={step}>
				<Step title="选择车辆" icon={<UserOutlined />} />
				<Step title="订单配置" icon={<SolutionOutlined />} />
				<Step title="选择联系人" icon={<LoadingOutlined />} />
				<Step title="订单完成" icon={<SmileOutlined />} />
			</Steps>
			<div className="step-content">
				{step === 0 && (
					<div>
						<AutoComplete
							dropdownMatchSelectWidth={252}
							style={{ width: 300 }}
							options={carOptions}
							onSelect={onCarSelect}
							onSearch={onHandleCarSearch}
						>
							<Input.Search size="middle" placeholder="input here" enterButton />
						</AutoComplete>
						{car.no && (
							<div className="car-info-container">
								<Descriptions column={2} title="车辆信息">
									<Descriptions.Item label="车牌号">{car.no}</Descriptions.Item>
									<Descriptions.Item label="品牌">{car.brand}</Descriptions.Item>
									<Descriptions.Item label="型号">{car.model}</Descriptions.Item>
									<Descriptions.Item label="类型">{car.type}</Descriptions.Item>
								</Descriptions>
								<Button type="primary" onClick={() => setStep(1)}>
									下一步
								</Button>
							</div>
						)}
					</div>
				)}
				{step === 1 && (
          <>
					<Form
          form={form}
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 14 }}
						layout="horizontal"
            initialValues={{ no: car.no }}
            onFinish={onFinish}
						// onValuesChange={onFormLayoutChange}
						// size={componentSize}
					>
						<Form.Item label="车牌号码" name="no">
							<Input disabled />
						</Form.Item>
						<Form.Item label="订单类型" name="type">
							<Select>
								{billTypes.map((temp) => {
									return (
										<Select.Option key={temp.type} value={temp.type}>
											{temp.title}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>
						<Form.Item label="订单金额" name="price">
							<Input />
						</Form.Item>
						<Form.Item label="生效日期" name="valid_date">
							<DatePicker />
						</Form.Item>
						<Form.Item label="失效日期" name="expire_date">
							<DatePicker />
						</Form.Item>
						<Form.Item label="公司名称" name="corporate">
							<Select>
								{corporates.map((temp) => {
									return (
										<Select.Option key={temp._id} value={temp._id}>
											{temp.name}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>

					</Form>
          <Button type="primary" onClick={e=>form.submit()}>下一步</Button>
          </>
				)}
			</div>
		</Modal>
	)
}
export { CreateBillModal }
