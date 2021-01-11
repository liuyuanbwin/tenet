import React, { useState, useEffect } from 'react'
import { Modal, Form, DatePicker, Select, Input, Button, message } from 'antd'
import { vehicleType } from '@/utils/string'
import { createCar, getMatchCar, getMatchLinkman } from '@/utils/index'
import Item from 'antd/lib/list/Item'
import CreateLinkmanModal from '@/components/CreateLinkmanModal'
const { Option } = Select
export default ({onClose}) => {
	const [ form ] = Form.useForm()
	const [ matchlinkmans, setMatchlinkmans ] = useState([])
	const [ createLinkman, setCreateLinkman ] = useState(false)
	useEffect(() => {
		const initData = async () => {
			let result = await getMatchLinkman('')
			result.data = result.data.map((linkman) => {
				linkman.value = linkman.name + '/' + linkman.tel
				return linkman
			})
			setMatchlinkmans(result.data)
		}
		initData()
	}, [createLinkman])
	const onTypeChange = (value) => {
		form.setFieldsValue({ type: value })
	}
	const onHandleCreateCar = async (value) => {
		form
			.validateFields()
			.then(async (values) => {
				console.log('%cindex.js line:14 values', 'color: #26bfa5;', values)
        let result = await createCar({...values})
        if(result.id){
          message.success('添加车辆成功')
          onClose(result.id)
        }
      })
			.catch((err) => {
				console.log('%cindex.js line:15 err', 'color: #26bfa5;', err)
			})
		// let result = await createCar(value)
		// console.log('%cindex.js line:13 result', 'color: #26bfa5;', result);
	}
	const onLinkmansChange = async (value) => {
		// console.log('%cindex.js line:21 value', 'color: #26bfa5;', value);
		// let result = await getMatchLinkman(value)
		// console.log('%cindex.js line:23 result', 'color: #26bfa5;', result);
		// result.data = result.data.map(linkman => {
		//   linkman.value = linkman.name + '/' + linkman.tel
		//   return linkman
		// })
		// setMatchlinkmans(value)
  }
  const onCloseCreateLinkman = () => {
    setCreateLinkman(false)

  }
	return (
		<Modal
			width="600"
			visible={true}
			title="录入车辆信息"
			wrapClassName="create-car-modal-body"
			okText="确认"
			cancelText="取消"
			onOk={onHandleCreateCar}
			closable
			onCancel={()=>onClose('')}
		>
			<div className="create-car-body">
				<Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} onFinish={() => {}}>
					<Form.Item label="车牌号" name="no" rules={[ { required: true, message: '请输入车牌号码' } ]}>
						<Input />
					</Form.Item>
					<Form.Item label="验车时间" name="check_date" rules={[ { required: true, message: '请选择验车日期' } ]}>
						<DatePicker />
					</Form.Item>
					<Form.Item label="车辆类型" name="type" rules={[ { required: true, message: '请选择车辆类型' } ]}>
						<Select onChange={onTypeChange} placeholder="请选择车辆类型" allowClear>
							{vehicleType.map((item) => (
								<Select.Option key={item.type} value={item.type}>
									{' '}
									<span>{item.title}</span>{' '}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label="发动机号码" name="engine_no">
						<Input />
					</Form.Item>
					<Form.Item label="车架号码" name="frame_no">
						<Input />
					</Form.Item>
					<Form.Item label="品牌" name="brand">
						<Input />
					</Form.Item>
          <Form.Item label="型号" name="model">
						<Input />
					</Form.Item>
					<Form.Item label="联系人" name="linkman_ids">
						<Select
							mode="multiple"
							onChange={onLinkmansChange}
							optionLabelProp="label"
							filterOption={async (inputValue, option) => {
								console.log('%cindex.js line:88 option.label', 'color: #26bfa5;', option.label)
								return option.label.indexOf(inputValue) >= 0
							}}
						>
							{matchlinkmans.map((linkman) => (
								<Option key={linkman._id} value={linkman._id} label={linkman.value}>
									<span key={linkman._id}>{linkman.value}</span>{' '}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Form>
				{JSON.stringify(matchlinkmans)}
				<Button onClick={() => setCreateLinkman(true)}>添加用户</Button>
				{createLinkman && <CreateLinkmanModal onClose={(id='')=>{
          setCreateLinkman(false)
          if(id) form.setFieldsValue({linkman_ids:[id]})
          }}/>}
			</div>
		</Modal>
	)
}
