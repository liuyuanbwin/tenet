import React from 'react'
import { useHistory } from 'react-router'
import { Button, Card, Form, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { emailLogin } from '@/utils/index'
import './login.less'
export const Login: React.FC<{}> = () => {
	const history = useHistory()
	const onFinish = async (values: any) => {
		console.log(values)
		let result = await emailLogin(values.username, values.password)
		console.log('result', result)
		history.push('/home')
	}
	return (
		<div className="login-container">
			<Card className="login-card-container">
				<Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
					<Form.Item name="username" rules={[ { required: true, message: 'Please input your Username!' } ]}>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!' } ]}>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>记住密码</Checkbox>
						</Form.Item>
						<a className="login-form-forgot" href="">
							忘记密码
						</a>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							登录
						</Button>
						Or <a href="">注册账号!</a>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}
