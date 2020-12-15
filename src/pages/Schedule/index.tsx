import React, { useState, useEffect } from 'react'
import { Calendar, Badge } from 'antd'
export const Schedule: React.FC<{}> = () => {
  const onPanelChange = () => {
    
  }
  return (
    <div>
      <Calendar onPanelChange={onPanelChange} />
    </div>
  )
}