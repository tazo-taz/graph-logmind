import { useEffect, useState } from 'react';
import CustomNodeFlow from './components/flow';
import './index.css';
import { FetchedHostData } from './components/flow/types';

export default function App() {
  const [data, setData] = useState<FetchedHostData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://beta.app.logmind.com/api/v1/search/boards/hosts?q=*", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MjEzMzIxLCJpYXQiOjE3MjU2MjEzMjEsImp0aSI6ImI1ZDEwMmFlZTI5MDQ3MzQ4ZDFmMWIzY2E5NWEyMjVmIiwidXNlcl9pZCI6IjYzYTE3YzJhYTMwZDI0YmU5NDQzM2VkMSJ9.vsUYkwfMTQVGkCjnR46YhZGWrJdcnLmlO6HO7u1X4no",
      }
    }).then((res) => res.json()).then((data) => {
      data.hosts[4].index.push("network-sw")
      setData(data.hosts)
      console.log(data.hosts);

    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ height: "100vh", padding: "0" }}>
      <CustomNodeFlow
        data={data}
      />
    </div>
  )
}
