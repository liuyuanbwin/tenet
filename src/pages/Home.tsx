import React, { useState, useEffect } from 'react'
import { auth, db } from '@/utils'
import { useHistory } from 'react-router'
import Table from '@/components/Table'
import { allBs } from '@/apis/b'

export const Home: React.FC<{}> = () => {
  const state = auth.hasLoginState()
  const history = useHistory()

  const [bs, setBs] = useState([] as any[])
  
  if (!state) {
    history.push('/login')
  }

  useEffect(() => {
    const fetchBill = async () => {
      let result = await allBs()
      console.log('%cHome.tsx line:20 Object', 'color: #26bfa5;', result);
      setBs(result)
    }
    fetchBill()
  }, [])

  const columns = [
    {
      title: 'no',
      dataIndex: 'cs',
      key: 'cs',
      render:(c:any ={no:''}) =>{
        return <p>{c[0].no}</p> 
      }
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'm',
      dataIndex: 'm',
      key: 'm'
    },
    {
      title: 'ms',
      dataIndex: 'ms',
      key: 'ms',
      render:(cs:any ={name:''}) =>{
        return <p>{cs[0].name}</p> 
      }
    }
  ]
  return (
    <div>
      <Table columns={columns} dataSource={bs} />
    </div>
  )
}
