import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { createLinkman } from '@/utils/index'

export default ({onClose}) => {
	const [ form ] = Form.useForm()

	const onSexChange = (value) => {
		console.log('%cindex.js line:8 value', 'color: #26bfa5;', value)
		form.setFieldsValue({ sex: value })
	}

	const onHandleCreateLinkman = () => {
		form
			.validateFields()
			.then(async (values) => {
				console.log('%cindex.js line:13 values', 'color: #26bfa5;', values)
        let result = await createLinkman({ ...values })
        if(result.id){
          message.success('添加成功')
          onClose(result.id)
        }
				console.log('%cindex.js line:17 result', 'color: #26bfa5;', result)
			})
			.catch((err) => {
				console.log('%cindex.js line:15 err', 'color: #26bfa5;', err)
			})
	}
	return (
		<Modal
			width="600"
			visible={true}
			title="录入用户信息"
			wrapClassName="create-linkman-modal-body"
			okText="确认"
			cancelText="取消"
			onOk={onHandleCreateLinkman}
			closable
			onCancel={()=>onClose()}
		>
			<div className="create-linkman-body">
				<Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} onFinish={() => {}}>
					<Form.Item label="姓名" name="name" rules={[ { required: true, message: '请输入姓名' } ]}>
						<Input />
					</Form.Item>
					<Form.Item label="电话" name="tel" rules={[ { required: true, message: '请输入手机号码' } ]}>
						<Input />
					</Form.Item>
					<Form.Item label="性别" name="sex" rules={[ { required: true, message: '请选择性别' } ]}>
						<Select placeholder="请选择性别" onChange={onSexChange}>
							<Select.Option key="male" value="male">
								男
							</Select.Option>
							<Select.Option key="female" value="female">
								女
							</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</div>
		</Modal>
	)
}
