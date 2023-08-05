import React, { useCallback, useContext, useState } from "react";
import MonContext from "../store/MonContext";
import MonitoringForm from "./MonitoringForm";

// {Monitor:{district,fracture,time,temperature,flow,gage,heat,energy,classification,situation}}
const Monitoring = (props) => {
	const [Loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isEdit, setIsEdit] = useState(null);
	// const ctx = useContext()
	const ctx = useContext(MonContext);
	const delMon = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await fetch(
				`http://localhost:1337/api/monitorings/${props.MonId}`,
				{
					method: "delete",
				}
			);
			if (res.ok) {
				const data = await res.json();
				ctx.fetchData();
				// console.log(data);
			} else {
				throw new Error("数据加载失败");
			}
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteHandler = () => {
		if(window.confirm("确定要删除该行数据吗？")){
			delMon();
		}
	};
	const cancelEdit = () => {
		setIsEdit(false);
	};
	// console.log(props.MonId);
	return (
		<>
			{!isEdit && (
				<tr>
					<td>{props.Mointor.district}</td>
					<td>{props.Mointor.fracture}</td>
					<td>{props.Mointor.time}</td>
					<td>{props.Mointor.temperature}</td>
					<td>{props.Mointor.flow}</td>
					<td>{props.Mointor.gage}</td>
					<td>{props.Mointor.heat}</td>
					<td>{props.Mointor.energy}</td>
					<td>{props.Mointor.classification}</td>
					<td>{props.Mointor.situation}</td>
					<td>
						<button onClick={deleteHandler}>删除</button>
						<button onClick={() => setIsEdit(true)}>修改</button>
					</td>
				</tr>
			)}
			{isEdit && (
				<MonitoringForm
					mon={props.Mointor}
					onCancel={cancelEdit}
					monId = {props.MonId}
				/>
			)}
			{Loading && (
				<tr>
					<td colSpan={11}>正在删除数据...</td>
				</tr>
			)}
			{error && (
				<tr>
					<td colSpan={11}>删除失败...</td>
				</tr>
			)}
		</>
	);
};

export default Monitoring;
