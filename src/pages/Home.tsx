import React, { useState, useEffect } from 'react'
import { Table, Drawer, Button, Row, Col, Descriptions, Badge } from 'antd'
import { auth, db } from '@/utils'
import { useHistory } from 'react-router'
import { allBs } from '@/apis/b'

export const Home: React.FC<{}> = () => {
	const state = auth.hasLoginState()
	const history = useHistory()

	const [ bs, setBs ] = useState([] as any[]) // 订单列表
	const [ billDetailVisible, setBillDetailVisible ] = useState(false)
	const [ detailItem, setDetailItem ] = useState({} as any)
	if (!state) {
		history.push('/login')
	}

	useEffect(() => {
		const fetchBill = async () => {
			let result = await allBs()
			console.log('%cHome.tsx line:20 Object', 'color: #26bfa5;', result)
			setBs(result)
		}
		fetchBill()
	}, [])

	const columns = [
		{
			title: '车牌号',
			dataIndex: 'cs',
			key: 'cs',
			render: (c: any = { no: '' }) => {
				return <p>{c[0].no}</p>
			}
		},
		{
			title: '车辆类型',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: '订单金额',
			dataIndex: 'm',
			key: 'm'
		},
		{
			title: '联系人',
			dataIndex: 'ms',
			key: 'ms',
			render: (cs: any = { name: '' }) => {
				return <p>{cs[0].name}</p>
			}
		},
		{
			title: '操作',
			key: 'opt',
			render: (cs: any = {}) => {
				return (
					<Button
						type="link"
						onClick={() => {
							setDetailItem(cs)
							setBillDetailVisible(!billDetailVisible)
						}}
					>
						详情
					</Button>
				)
			}
		}
	]
	const DetailItme = () => (
		<Descriptions title="订单详情" layout="vertical" bordered>
			<Descriptions.Item label="车牌号码">{detailItem.cs[0].no}</Descriptions.Item>
			<Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
			<Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
			<Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
			<Descriptions.Item label="Usage Time" span={2}>
				2019-04-24 18:00:00
			</Descriptions.Item>
			<Descriptions.Item label="Status" span={3}>
				<Badge status="processing" text="Running" />
			</Descriptions.Item>
			<Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
			<Descriptions.Item label="Discount">$20.00</Descriptions.Item>
			<Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
			<Descriptions.Item label="Config Info">
				Data disk type: MongoDB
				<br />
				Database version: 3.4
				<br />
				Package: dds.mongo.mid
				<br />
				Storage space: 10 GB
				<br />
				Replication factor: 3
				<br />
				Region: East China 1<br />
			</Descriptions.Item>
		</Descriptions>
	)
	const onCloseDetail = () => {
		setBillDetailVisible(false)
	}
	return (
		<div>
			<Table columns={columns} dataSource={bs} />
			<Drawer maskClosable width={650} closable={false} onClose={onCloseDetail} visible={billDetailVisible}>
				<Row>
					<Col span={24}>
						<DetailItme />
					</Col>
				</Row>
			</Drawer>
		</div>
	)
}
