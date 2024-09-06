import React, { useEffect } from 'react'
import CustomNodeFlow from './components/flow'
import './index.css';
import NodeAsHandleFlow from './components/flow/floating-edge-feature';

export default function App() {
  // useEffect(() => {
  //   fetch("https://beta.app.logmind.com/api/v1/search/boards/sources?q=*/", {
  //     headers: {
  //       Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MjEzMzIxLCJpYXQiOjE3MjU2MjEzMjEsImp0aSI6ImI1ZDEwMmFlZTI5MDQ3MzQ4ZDFmMWIzY2E5NWEyMjVmIiwidXNlcl9pZCI6IjYzYTE3YzJhYTMwZDI0YmU5NDQzM2VkMSJ9.vsUYkwfMTQVGkCjnR46YhZGWrJdcnLmlO6HO7u1X4no",
  //     }
  //   }).then((res) => res.json()).then((data) => {
  //     console.log(data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }, [])
  return (
    <div style={{ height: "80vh", padding: "0 100px" }}>
      <CustomNodeFlow />
    </div>
  )
}
