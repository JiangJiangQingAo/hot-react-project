import React, { useState, useEffect} from "react";
import Monitoring from "./Monitoring";
import "./MonitoringData.css";
import MonitoringForm from "./MonitoringForm";
const MonitoringData = (props) => {
    const [searchInput,setSearchInput] = useState([]);
    const [searchDis,setSearchDis] = useState();
    const searchItems = (searchValue)=>{
        setSearchInput(searchValue)
    }
    if(props.Monitorings.length>0){
		for(let i =0 ;i<props.Monitorings.length;i++){
            // console.log(props.Monitorings[i].attributes.district===searchInput);
			// console.log(props.Monitorings[i].attributes.district);
            // setSearchDis = props.Monitorings[i].attributes
		}
	}
    // setSearchDis(props)
    // console.log(searchInput);
    // console.log(searchDis);
    return (
		<>
			{/* <div className="search">
				<input type="text" 
                    placeholder="Search..."
                    onChange={(e)=>searchItems(e.target.value)}
                />
                <button>搜索</button>
			</div> */}
			<table>
				<thead>
					<tr>
						<th>地区</th>
						<th>断面名称</th>
						<th>监测时间</th>
						<th>温度</th>
						<th>水流速度</th>
						<th>水压</th>
						<th>热量流量</th>
						<th>能耗和能效</th>
						<th>水质类别</th>
						<th>站点情况</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					{props.Monitorings.map((Monitor) => (
						<Monitoring
							key={Monitor.id}
							Mointor={Monitor.attributes}
							MonId ={Monitor.id}
						/>
					))}
				</tbody>
				<tfoot>
					<MonitoringForm></MonitoringForm>
				</tfoot>
			</table>
		</>
	);
};

export default MonitoringData;
