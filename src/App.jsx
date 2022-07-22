import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/.netlify/functions/api/classes");
      const data = await response.json();
      setData(data);
    })();
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>科目名</th>
            <th>担当教員</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.teacher}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
