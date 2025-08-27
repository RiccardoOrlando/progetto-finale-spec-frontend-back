import { useCallback, useEffect, useState } from "react";

function debounce(callback, delay) {
 let timer;
 return function (...args) {
   clearTimeout(timer);
   timer = setTimeout(() => {
     callback(...args);
   }, delay);
 };
}

export default function useFetchData(search, category) {
 const [data, setData] = useState([]);
 const [hasPendingSearch, setHasPendingSearch] = useState(false);

 const fetchData = useCallback(async (searchTerm, categoryTerm) => {
   const params = new URLSearchParams();
   if (searchTerm && searchTerm.trim()) params.set("search", searchTerm);
   if (categoryTerm && categoryTerm.trim()) params.set("category", categoryTerm);
   
   try {
     const response = await fetch(
       `http://localhost:3001/softwares?${params.toString()}`
     );
     const data = await response.json();
     setData(data);
     setHasPendingSearch(false);
   } catch (err) {
     console.error(err);
     setHasPendingSearch(false);
   }
 }, []);

 const debouncedFetch = useCallback(
   debounce((searchTerm, categoryTerm) => {
     fetchData(searchTerm, categoryTerm);
   }, 500),
   [fetchData]
 );

 useEffect(() => {
   if (category && category.trim()) {
     setHasPendingSearch(false);
     fetchData(search, category);
   } 
   else if (search && search.trim()) {
     setHasPendingSearch(true);
     debouncedFetch(search, "");
   }
   else if (!search.trim() && !category.trim() && !hasPendingSearch) {
     fetchData("", "");
   }
 }, [search, category, hasPendingSearch]);

 return { data };
}