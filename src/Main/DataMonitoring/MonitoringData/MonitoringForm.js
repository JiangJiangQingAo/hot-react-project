import React, { useCallback, useContext, useState } from "react";
import MonContext from "../store/MonContext";
import "./MonitoringForm.css";
const MonitoringForm = (props) => {
    // console.log(props.monId);
	const [inputData, setInputData] = useState({
		district: props.mon?props.mon.district:'',
		fracture: props.mon?props.mon.fracture:'',
		time: props.mon?props.mon.time:'',
		temperature: props.mon?props.mon.temperature:'',
		flow: props.mon?props.mon.flow:'',
		gage: props.mon?props.mon.gage:'',
		heat: props.mon?props.mon.heat:'',
		energy: props.mon?props.mon.energy:'',
		classification: props.mon?props.mon.classification:'',
		situation: props.mon?props.mon.situation:"normal",
	});

	// const [mockMonData,setMockMonData] = useState()
	// const generateData = ()=>{
	// 	const mockData = Mock.mock({
	// 		'data': {
	// 			'district': '福建省',
	// 			'fracture': '三明市',
	// 			'time': '2023-04-03',
	// 			'temperature|35-40': 1,
	// 			'flow|5-15': 1,
	// 			'gage|10-20': 1,
	// 			'heat|10-20': 1,
	// 			'energy|10-20': 1,
	// 			'classification': Mock.Random.pick(['Ⅰ', 'Ⅱ', 'Ⅲ','Ⅳ','Ⅴ']),
	// 			'situation': Mock.Random.pick(['normal', 'maintenance', 'NoOperating']),
	// 		}
	// 	})
	// 	setMockMonData(mockData)
	// 	if(mockMonData){
	// 		fetch("http://localhost:1337/api/monitorings/", {
	// 			method: "post",
	// 			body: JSON.stringify({ data: mockMonData.data }),
	// 			headers: {
	// 				"Content-type": "application/json",
	// 			},
	// 		}).then(response => response.json())
	// 		.then(data => console.log(data))
	// 		.catch(error => console.error(error));
	// 	console.log(mockMonData?mockMonData.data:1);
	// 	}
		
	// }
	const ctx = useContext(MonContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const addMon = useCallback(async (newMon) => {
		try {
			setLoading(true);
			setError(null);
			const res = await fetch("http://localhost:1337/api/monitorings/", {
				method: "post",
				body: JSON.stringify({ data: newMon }),
				headers: {
					"Content-type": "application/json",
				},
			});
			if (!res.ok) {
				throw new Error("添加失败");
			}
			ctx.fetchData();
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	}, []);
    const updateMon = useCallback(async(id,newMon)=>{
        try {
			setLoading(true);
			setError(null);
			const res = await fetch(`http://localhost:1337/api/monitorings/${id}`, {
				method: "put",
				body: JSON.stringify({ data: newMon }),
				headers: {
					"Content-type": "application/json",
				},
			});
			if (!res.ok) {
				throw new Error("修改失败");
			}
			ctx.fetchData();
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
    },[])
	const disChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, district: e.target.value }));
	};
	const fraChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, fracture: e.target.value }));
	};
	const timeChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, time: e.target.value }));
        // console.log(e.target.value.replace(/-/g,"/"));

	};
	const temChangeHandler = (e) => {
		setInputData((prevState) => ({
			...prevState,
			temperature: +e.target.value,
		}));
	};
	const flowChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, flow: +e.target.value }));
	};
	const gageChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, gage: +e.target.value }));
	};
	const heatChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, heat: +e.target.value }));
	};
	const energyChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, energy: +e.target.value }));
	};
	const classChangeHandler = (e) => {
		setInputData((prevState) => ({
			...prevState,
			classification: e.target.value,
		}));
	};
	const sitChangeHandler = (e) => {
		setInputData((prevState) => ({ ...prevState, situation: e.target.value }));
	};
	const submitHandler = () => {
		addMon(inputData);
	};
    const updateHandler =()=>{
        updateMon(props.monId ,inputData)
    }
	return (
		<>
			<tr className="Mon-form">
				<td>
					<input
						onChange={disChangeHandler}
						value={inputData.district}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={fraChangeHandler}
						value={inputData.fracture}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={timeChangeHandler}
						value={inputData.time}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={temChangeHandler}
						value={inputData.temperature}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={flowChangeHandler}
						value={inputData.flow}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={gageChangeHandler}
						value={inputData.gage}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={heatChangeHandler}
						value={inputData.heat}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={energyChangeHandler}
						value={inputData.energy}
						type="text"
					/>
				</td>
				<td>
					<input
						onChange={classChangeHandler}
						value={inputData.classification}
						type="text"
					/>
				</td>
				<td>
					<select
						onChange={sitChangeHandler}
						value={inputData.situation}
					>
						<option value="normal">normal</option>
						<option value="maintenance">maintenance</option>
						<option value="NoOperating">NoOperating</option>
					</select>
				</td>
				<td>
                    {props.mon &&<>
                        <button onClick={()=>props.onCancel()}>取消</button>
                        <button onClick={updateHandler}>确认</button>
                    </>}
                    {!props.mon &&<button onClick={submitHandler}>添加</button>}
				</td>
			</tr>
            {loading && <tr><td colSpan={11}>添加中...</td></tr>}
            {error && <tr><td colSpan={11}>添加失败...</td></tr>}
		</>
	);
};

export default MonitoringForm;
