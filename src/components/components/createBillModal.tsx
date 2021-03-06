import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import {
  Modal,
  Steps,
  AutoComplete,
  Input,
  Descriptions,
  Button,
  Form,
  Select,
  DatePicker,
  message,
} from 'antd'
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons'
import CreateCarModal from '@/components/CreateCarModal'
import { getMatchCar, getMatchLinkman, getCorporates ,createBill} from '@/utils/index'
import { billTypes } from '@/utils/string'
import './createBillModal.less'
const { Step } = Steps

const CreateBillModal = (props: any) => {
  const [step, setStep] = useState(0) //  0 选择车辆,1 订单配置 , 2选择联系人,3 订单生成
  const [carOptions, setCarOptions] = useState<{ value: string }[]>([])
  const [linkmanOptions, setLinkmanOptions] = useState<{ value: string }[]>([])
  const [car, setCar] = useState<any>({})
	const [linkman, setLinkman] = useState<any>({})
	const [billInfo, setBillInfo] = useState<any>({})
  const [corporates, setCorporates] = useState<{ _id: string; name: string }[]>([])

  const [createCar, setCreateCar] = useState(false);

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
  }
  const onLinkManSelect = (e: any, option: any) => {
    setLinkman(option)
  }
  const onHandleCarSearch = async (e: any) => {
    if (e === '') return
    let result = await getMatchCar(String(e))
    result.data = result.data.map((car: any) => {
      car.value = `${car.no} / ${car.brand || '--'} / ${car.model || '--'}`
      return car
    })
    setCarOptions(result.data)
  }

  const onHandleLinkmanSearch = async (e: any) => {
		if (e === '') return
    let result = await getMatchLinkman(String(e))
    result.data = result.data.map((linkman: any) => {
      linkman.value = linkman.name + '/' + linkman.tel
      return linkman
    })
    setLinkmanOptions(result.data)
  }

  const onFinish = (values: any) => {
    console.log('%ccreateBillModal.tsx line:59 values', 'color: #26bfa5;', values)
		setBillInfo(values)
		setStep(2)
	}
	
	const onCreateBill = async () =>{
	//	console.log('%ccreateBillModal.tsx line:78 car , billInfo, linkman', 'color: #26bfa5;', car , billInfo, linkman);
		let tempBillInfo = {
			car_id:car._id,
			create_date:new Date(),
			expire_date:billInfo.expire_date.format(),
			insurancebrand_id:billInfo.corporate,
			linkman_ids:[linkman._id],
			price:billInfo.price,
			type:billInfo.type,
			valid_date:billInfo.valid_date.format()
		}
    console.log('%ccreateBillModal.tsx line:90 tempBillInfo', 'color: #26bfa5;', tempBillInfo);
    let result = await createBill(tempBillInfo)
    if(result.id){
      message.success('新建订单成功')
    }
    props.onClose()
	}
  return (
    <Modal
      width="800"
      visible={true}
      title="sssfsf"
      wrapClassName="create-bill-modal-body"
      onCancel={props.onClose}
      footer={null}
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
              <Input.Search size="middle" placeholder="输入车牌号" enterButton />
              
            </AutoComplete>
            <Button onClick={()=>setCreateCar(true)}>新建</Button>
              {createCar && <CreateCarModal onClose={()=>setCreateCar(false)}/>}
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
            <Button type="primary" onClick={(e) => form.submit()}>
              下一步
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <h1>选择联系人</h1>
            <AutoComplete
              dropdownMatchSelectWidth={252}
              style={{ width: 300 }}
              options={linkmanOptions}
              onSelect={onLinkManSelect}
              onSearch={onHandleLinkmanSearch}
            >
              <Input.Search size="middle" placeholder="输入姓名查询" enterButton />
            </AutoComplete>
            <div>
            <Button type="primary" onClick={onCreateBill}>
              完成
            </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
export { CreateBillModal }
