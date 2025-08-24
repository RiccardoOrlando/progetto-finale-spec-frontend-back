import { useEffect, useState } from "react";

export default function useFetchData(search, category) {
  const [data, setData] = useState([]);

  let url = "/softwares";

  if (search) url += `?search=${search}`;
  if (category) url += search ? `?search=${category}` : `?search=${category}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3001/${url}`);
        const data = await response.json()
        console.log(data)
        return setData(data)
      } catch (err) {
        console.error(err);
        return;
      }
    }

    fetchData()
  }, [search, category]);
}