import { useEffect, useState } from 'react';
import CustomNodeFlow from './components/flow';
import './index.css';
import { FetchedHostData } from './components/flow/types';

export default function App() {
  const [data, setData] = useState<FetchedHostData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // @ts-ignore
    console.log(window.tazox);

    fetch("https://beta.app.logmind.com/api/v1/search/boards/hosts?q=*", {
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMDQwNTM5LCJpYXQiOjE3Mjc0NDg1MzksImp0aSI6ImU3YTMyY2RiNmE3NzRiN2I5YzM0MDg3N2MwOGQ0ZTBkIiwidXNlcl9pZCI6IjYzYTE3YzJhYTMwZDI0YmU5NDQzM2VkMSJ9.c9hAYnNGeCobyQBmgjItQjyWy6hA9doNKu-uQoYHr3o",
      }
    }).then((res) => res.json()).then((data) => {
      data.hosts[4].index.push("network-sw")
      setData(data.hosts)
      console.log(data.hosts, "xxxxx");

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
