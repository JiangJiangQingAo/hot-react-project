import React, { useCallback, useEffect, useState } from "react";
import MonitoringData from "./MonitoringData/MonitoringData";
import "./DataMonitoring.css";
import MonContext from "./store/MonContext";
import Mock from 'mockjs'
const DataMonitoring = () => {
	const [MonData, setMonData] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [mockMonData,setMockMonData] = useState()
	const generateData = ()=>{
		const mockData = Mock.mock({
			'data': {
				'district': '福建省',
				'fracture': '三明市',
				'time': '2023-04-03',
				'temperature|35-40': 1,
				'flow|5-15': 1,
				'gage|10-20': 1,
				'heat|10-20': 1,
				'energy|10-20': 1,
				'classification': Mock.Random.pick(['Ⅰ', 'Ⅱ', 'Ⅲ','Ⅳ','Ⅴ']),
				'situation': Mock.Random.pick(['normal', 'maintenance', 'NoOperating']),
			}
		})
		setMockMonData(mockData)
		console.log(mockMonData);
		if(mockMonData){
			fetch("http://localhost:1337/api/monitorings/", {
				method: "post",
				body: JSON.stringify({ data: mockMonData.data }),
				headers: {
					"Content-type": "application/json",
				},
			}).then(response => response.json())
			.catch(error => console.error(error));
		console.log(2);
		
		}
	}

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await fetch("http://localhost:1337/api/monitorings");
			if (res.ok) {
				const data = await res.json();
				// console.log(data);
				setMonData(data.data);
			} else {
				throw new Error("数据加载失败");
			}
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	}, []);
	useEffect(() => {
		fetchData();
	}, []);
	const LoadDataHandler = () => {
		fetchData();
	};
	return (
		<MonContext.Provider value={{fetchData}}>
			<div>
				<button onClick={()=>{LoadDataHandler();generateData()}} >刷新数据</button>
				{/* <button onClick={generateData}>shuaxin</button> */}
				{!Loading && !error && (
					<MonitoringData Monitorings={MonData}></MonitoringData>
				)}
				{Loading && <p>数据正在加载中</p>}
				{error && <p>数据加载异常</p>}
			</div>
		</MonContext.Provider>
	);
};

export default DataMonitoring;
