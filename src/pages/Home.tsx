import { Button } from 'antd'
import React, { Fragment } from 'react'
import { db, auth } from '@/utils'
import { useHistory } from 'react-router'
import Table from '../components/Table'

export const Home: React.FC<{}> = () => {
  let state = auth.hasLoginState()
  let history = useHistory()
  console.log('%cHome.tsx line:10 state', 'color: #26bfa5;', state);
  if (!state) {
    history.push('/login')
  }
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
  <div>
    <Table
      columns={columns}
      dataSource={dataSource}
    >
    </Table>
  </div>
  )
}
