import { useEffect, useState } from 'react';
import CustomNodeFlow from './components/flow';
import './index.css';
import { FetchedHostData } from './components/flow/types';
import axios from 'axios';

const defaultAuthorization = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MDY2MjA0LCJpYXQiOjE3MzI0NzQyMDQsImp0aSI6IjA2OTNjMzAzYmQwNzRiMjg5ZGQ2MDVkY2VhZGRhZWQ5IiwidXNlcl9pZCI6IjYzYTE3YzJhYTMwZDI0YmU5NDQzM2VkMSJ9.yJnlJu2mXH8U0MCP_MF2V60MB3BHWSFIIg-ZBi3iWRE";
const body = { "indices": [], "from": 0, "size": 10000, "order_by": "count", "order": "desc", "times": { "data": [{ "gte": "", "lte": "now/d" }], "title": "All time" }, "q": "" }
const url = "https://dev.app.logmind.com/api/search/board/hosts/"

export default function App() {
  const [data, setData] = useState<FetchedHostData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.post(url, body, {
      headers: {
        'Authorization': defaultAuthorization,
      }
    }).then((response) => {
      setData(response.data.result)
      setLoading(false)
      console.log(response.data);
    }).catch((error) => {
      console.error('There was an error!', error)
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
