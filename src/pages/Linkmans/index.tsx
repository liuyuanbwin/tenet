import React, { useState, useEffect } from 'react'
import { Table, Drawer, Button, Row, Col, Descriptions, Badge, PageHeader } from 'antd'
import { useHistory } from 'react-router'
import { loginState, getLinkmans } from '@/utils/index'
import { billTypes, vehicleType, billTypeTitle } from '@/utils/string'
import { dateStr } from '@/utils/date'
import CreateLinkmanModal from '@/components/CreateLinkmanModal'

export const Linkmans: React.FC<{}> = () => {
	const [ logState, setLogState ] = useState(true as any) //
	const [ createCarModalVisible, setCreateCarModalVisible ] = useState(false)
	const history = useHistory()
	const [ cars, setCars ] = useState([] as any[]) // 订单列表
	const [ billDetailVisible, setBillDetailVisible ] = useState(false)
	const [ detailItem, setDetailItem ] = useState({} as any)

	useEffect(
		() => {
			const getState = async () => {
				let tstate = await loginState()
				setLogState(tstate)
				if (!tstate) history.push('/login')
			}
			getState()
			const fetchCars = async () => {
				let data = (await getLinkmans({})) || {}
				console.log('%cerror data line:22 ', 'color: red; display: block; width: 100%;', data)
				setCars(data)
			}
			fetchCars()
		},
		[ createCarModalVisible ]
	)


	const columns = [
		{
			title: '姓名',
			width: 200,
			dataIndex: 'name',
			key: 'name',
			render: (text: string, record: any, index: number) => {
				return <p key={index}>{record.name}</p>
			}
		},
		{
			title: '电话',
			dataIndex: 'tel',
			key: 'tel',
			render: (text: any, record: any, index: any) => {
				return <p key={index}>{record.tel||'-'}</p>
			}
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			render: (text: any, record: any) => {
				return <p>{record.sex||'-'}</p>
			}
		},
		{
			title: '操作',
			key: 'opt',
			dataIndex: 'opt',
			render: (text: any, record: any, index: any) => {
				return (
					<Button
						key={index}
						type="link"
						onClick={() => {
							setDetailItem(record)
							setBillDetailVisible(!billDetailVisible)
						}}
					>
						详情
					</Button>
				)
			}
		}
	]
	const DetailItme = () => {
		console.log('%cHome.tsx line:87 detailItem', 'color: #26bfa5;', detailItem)
		let typeTitle = billTypeTitle(detailItem.type).title
		let linkmanName = detailItem.linkmans.length ? detailItem.linkmans[0].name : '--'
		let linkmanTel = detailItem.linkmans.length ? detailItem.linkmans[0].tel : '--'
		return (
			<Descriptions column={3} title="订单详情" layout="vertical" bordered>
				<Descriptions.Item label="车牌号码" span={1}>
					{detailItem.car_info.no}
				</Descriptions.Item>
				<Descriptions.Item label="订单类型">{typeTitle}</Descriptions.Item>
				<Descriptions.Item label="订单金额">{detailItem.price}</Descriptions.Item>
				<Descriptions.Item label="联系人">{linkmanName}</Descriptions.Item>
				<Descriptions.Item label="联系人电话" span={1}>
					{linkmanTel}
				</Descriptions.Item>
				<Descriptions.Item label="成交时间">{dateStr(detailItem.create_date)}</Descriptions.Item>
				<Descriptions.Item label="过期时间">{dateStr(detailItem.expire_date)}</Descriptions.Item>
				<Descriptions.Item label="车辆状态">
					<Badge status="processing" text="Running" />
				</Descriptions.Item>
				<Descriptions.Item label="订单金额">$80.00</Descriptions.Item>
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
	}
	const onCloseDetail = () => {
		setBillDetailVisible(false)
	}
	return (
		<div>
			<PageHeader
				onBack={() => null}
				title="联系人列表"
				extra={[
					<Button key="1"
						onClick={() => {
							setCreateCarModalVisible(true)
						}}
					>
						录入联系人
					</Button>
				]}
			/>
			<Table rowKey={(record) => record._id} columns={columns} dataSource={cars} />
			<Drawer maskClosable width={650} closable={false} onClose={onCloseDetail} visible={billDetailVisible}>
				<Row>
					<Col span={24}>
						<DetailItme />
					</Col>
				</Row>
			</Drawer>
			{createCarModalVisible && <CreateLinkmanModal onClose={() => setCreateCarModalVisible(false)} />}
		</div>
	)
}
