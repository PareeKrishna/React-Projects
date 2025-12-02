import {useEffect, useState} from "react";


function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        ).then((res) => res.json())
        .then((res)=>setData(res[currency]))
    },[currency])

    console.log(data);
    return data;
    //the data that it returns is an object with key as currency code and value as exchange rate
}


export default useCurrencyInfo;