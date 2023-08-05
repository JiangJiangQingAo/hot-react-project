import React, { useState, useEffect } from "react";
import "./DataAnalysis.css";
// import * as echarts from "echarts";
import * as echarts from "echarts"
import ReactEcharts from "echarts-for-react";

const DataAnalysis = () => {
	const [echartData, setEchartData] = useState(null);
	const [echart1Data, setEchart1Data] = useState(null);
	// const [newSit,setNewSit] = useState(null)
	// const [Loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("http://localhost:1337/api/analyses");
			if (res.ok) {
				const data = await res.json();
				setEchartData(data.data);
				// setLoading(false);
			}
		};
		fetchData();
	}, []);
	useEffect(() => {
		const fetch1Data = async () => {
			const res = await fetch("http://localhost:1337/api/monitorings");
			if (res.ok) {
				const data = await res.json();
				setEchart1Data(data.data);
			}
		};
		fetch1Data(echartData);
	}, []);
	const option = {
		color: "#5B8FF9",
		grid: {
			top: "5%",
			left: "3%",
			right: "4%",
			bottom: "15%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			data: echartData
				? [
						echartData[echartData.length-7].attributes.xAxis_data,
						echartData[echartData.length-6].attributes.xAxis_data,
						echartData[echartData.length-5].attributes.xAxis_data,
						echartData[echartData.length-4].attributes.xAxis_data,
						echartData[echartData.length-3].attributes.xAxis_data,
						echartData[echartData.length-2].attributes.xAxis_data,
						echartData[echartData.length-1].attributes.xAxis_data,
				  ]
				: [],
			axisLine: {
				lineStyle: {
					color: "#999",
				},
			},
			axisLabel: {
				fontSize: 14,
				color: "#666",
			},
			axisTick: {
				show: false,
			},
		},
		yAxis: {
			type: "value",
			axisLine: {
				show: false,
			},
			axisLabel: {
				fontSize: 14,
				color: "#666",
			},
			splitLine: {
				lineStyle: {
					color: "#EDEDED",
				},
			},
		},
		series: [
			{
				data: echartData
					? [
							echartData[echartData.length-7].attributes.yAxi_data,
							echartData[echartData.length-6].attributes.yAxi_data,
							echartData[echartData.length-5].attributes.yAxi_data,
							echartData[echartData.length-4].attributes.yAxi_data,
							echartData[echartData.length-3].attributes.yAxi_data,
							echartData[echartData.length-2].attributes.yAxi_data,
							echartData[echartData.length-1].attributes.yAxi_data,
					  ]
					: [],
				type: "bar",
				barWidth: "40%",
				itemStyle: {
					emphasis: {
						barBorderRadius: 30,
					},
					normal: {
						barBorderRadius: 30,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#5B8FF9" },
							{ offset: 0.5, color: "#5B8FF9" },
							{ offset: 1, color: "#C8D4F5" },
						]),
					},
				},
			},
		],
	};
	const option1 = {
		series: [
			{
				type: "gauge",
				center: ["50%", "60%"],
				startAngle: 200,
				endAngle: -20,
				min: 0,
				max: 60,
				splitNumber: 12,
				itemStyle: {
					color: "#FFAB91",
				},
				progress: {
					show: true,
					width: 30,
				},
				pointer: {
					show: false,
				},
				axisLine: {
					lineStyle: {
						width: 30,
					},
				},
				axisTick: {
					distance: -45,
					splitNumber: 5,
					lineStyle: {
						width: 2,
						color: "#999",
					},
				},
				splitLine: {
					distance: -52,
					length: 14,
					lineStyle: {
						width: 3,
						color: "#999",
					},
				},
				axisLabel: {
					distance: -20,
					color: "#999",
					fontSize: 20,
				},
				anchor: {
					show: false,
				},
				title: {
					show: false,
				},
				detail: {
					valueAnimation: true,
					width: "60%",
					lineHeight: 40,
					borderRadius: 8,
					offsetCenter: [0, "-15%"],
					fontSize: 30,
					fontWeight: "bolder",
					formatter: "{value} °C",
					color: "inherit",
				},
				data: [
					{
						value: echart1Data ? [echart1Data[echart1Data.length-1].attributes.flow] : [],
					},
				],
			},
			{
				type: "gauge",
				center: ["50%", "60%"],
				startAngle: 200,
				endAngle: -20,
				min: 0,
				max: 60,
				itemStyle: {
					color: "#FD7347",
				},
				progress: {
					show: true,
					width: 8,
				},
				pointer: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				detail: {
					show: false,
				},
				data: [
					{
						value: echart1Data ? [echart1Data[echart1Data.length-1].attributes.gage] : [],
					},
				],
			},
		],
	};
	const option2 = {
		grid: {
			top: "5%",
			left: "3%",
			right: "4%",
			bottom: "15%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			data: echartData
				? [
						echartData[echartData.length-7].attributes.xAxis_data,
						echartData[echartData.length-6].attributes.xAxis_data,
						echartData[echartData.length-5].attributes.xAxis_data,
						echartData[echartData.length-4].attributes.xAxis_data,
						echartData[echartData.length-3].attributes.xAxis_data,
						echartData[echartData.length-2].attributes.xAxis_data,
						echartData[echartData.length-1].attributes.xAxis_data,
				  ]
				: [],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: "line",
				smooth: true,
			},
		],
	};
	const findSit=(sit)=>{
		let counter=0;
		if(echart1Data){
			for( const obj of echart1Data){
				if(obj.attributes.situation===sit){
					counter++;
				}
			}
		}
		return counter
	}
	const option3 = {
		tooltip: {
			trigger: "item",
			textStyle: {
				fontSize: 16,
			},
		},
		legend: {
			top: "5%",
			left: "center",
			textStyle: {
				color: "#ccc",
				fontSize: 16,
			},
		},
		series: [
			{
				name: "Access From",
				type: "pie",
				radius: ["40%", "70%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: "#0B2151",
					borderWidth: 2,
				},
				label: {
					show: false,
					position: "center",
					textStyle: {
						fontSize: 30,
						fontWeight: "bold",
						color: "#fff",
					},
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 30,
						fontWeight: "bold",
					},
				},
				labelLine: {
					show: false,
				},
				data: [
					{ value: echart1Data?findSit('normal'):1, name: "Normal" },
					{ value: echart1Data?findSit('maintenance'):1, name: "Maintenance" },
					{ value: echart1Data?findSit('NoOperating'):1, name: "NoOperating" },
					// { value: 484, name: "Union Ads" },
					// { value: 300, name: "Video Ads" },
				],
			},
		],
	};
	const option4 = {
		xAxis: {
			data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
		},
		yAxis: {},
		series: [
			{
				type: "candlestick",
				data: [
					[20, 34, 10, 38],
					[40, 35, 30, 50],
					[31, 38, 33, 44],
					[38, 15, 5, 42],
				],
			},
		],
	};
	let category = [];
	let dottedBase = +new Date();
	let lineData = [];
	let barData = [];
	for (let i = 0; i < 20; i++) {
		let date = new Date((dottedBase += 3600 * 24 * 1000));
		category.push(
			[date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
		);
		let b = Math.random() * 200;
		let d = Math.random() * 200;
		barData.push(b);
		lineData.push(d + b);
	}
	const option5 = {
		// backgroundColor: "",
		grid: {
			top: "5%",
			left: "3%",
			right: "4%",
			bottom: "0%",
			containLabel: true,
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		legend: {
			data: ["line", "bar"],
			textStyle: {
				color: "#ccc",
			},
		},
		xAxis: {
			data: category,
			axisLine: {
				lineStyle: {
					color: "#ccc",
				},
			},
		},
		yAxis: {
			splitLine: { show: false },
			axisLine: {
				lineStyle: {
					color: "#ccc",
				},
			},
		},
		series: [
			{
				name: "line",
				type: "line",
				smooth: true,
				showAllSymbol: true,
				symbol: "emptyCircle",
				symbolSize: 15,
				data: lineData,
			},
			{
				name: "bar",
				type: "bar",
				barWidth: 10,
				itemStyle: {
					borderRadius: 5,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#14c8d4" },
						{ offset: 1, color: "#43eec6" },
					]),
				},
				data: barData,
			},
			{
				name: "line",
				type: "bar",
				barGap: "-100%",
				barWidth: 10,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(20,200,212,0.5)" },
						{ offset: 0.2, color: "rgba(20,200,212,0.2)" },
						{ offset: 1, color: "rgba(20,200,212,0)" },
					]),
				},
				z: -12,
				data: lineData,
			},
			{
				name: "dotted",
				type: "pictorialBar",
				symbol: "rect",
				itemStyle: {
					color: "#0f375f",
				},
				symbolRepeat: true,
				symbolSize: [12, 4],
				symbolMargin: 1,
				z: -10,
				data: lineData,
			},
		],
	};
	const option6 = {
		dataset: {
			source: [
				["score", "amount", "product"],
				[89.3, 58212, "Matcha Latte"],
				[57.1, 78254, "Milk Tea"],
				[74.4, 41032, "Cheese Cocoa"],
				[50.1, 12755, "Cheese Brownie"],
				[89.7, 20145, "Matcha Cocoa"],
				[68.1, 79146, "Tea"],
				[19.6, 91852, "Orange Juice"],
				[10.6, 101852, "Lemon Juice"],
				[32.7, 20112, "Walnut Brownie"],
			],
		},
		textStyle: {
			color: "#fff",
		},
		grid: { containLabel: true },
		xAxis: {
			name: "amount",
			textStyle: {
				fontSize: 20,
			},
		},
		yAxis: {
			type: "category",
			textStyle: {
				fontSize: 20,
			},
		},
		visualMap: {
			orient: "horizontal",
			left: "center",
			min: 10,
			max: 100,
			text: ["High Score", "Low Score"],
			// Map the score column to color
			dimension: 0,
			textStyle: {
				color: "#fff",
			},
			inRange: {
				color: ["#65B581", "#FFCE34", "#FD665F"],
			},
		},
		series: [
			{
				type: "bar",
				encode: {
					// Map the "amount" column to X axis.
					x: "amount",
					// Map the "product" column to Y axis
					y: "product",
				},
			},
		],
	};
	
	return (
		<div>
			<section className="mainbox">
				<div className="column">
					<div className="panel bar">
						<h2>能耗-柱状图</h2>
						<div className="chart">
							<ReactEcharts option={option} />
						</div>
						<div className="panel-footer"></div>
					</div>
					<div className="panel line">
						<h2>温度折线图</h2>
						<div className="chart">
							<ReactEcharts option={option2}></ReactEcharts>
						</div>
						<div className="panel-footer"></div>
					</div>
					<div className="panel pie">
						<h2>K线型</h2>
						<div className="chart">
							<ReactEcharts option={option4}></ReactEcharts>
						</div>
						<div className="panel-footer"></div>
					</div>
				</div>
				<div className="column ">
					<div>
						<div className="chart5">
							<ReactEcharts option={option5}></ReactEcharts>
						</div>
						<div className="chart6">
							<ReactEcharts option={option6}></ReactEcharts>
						</div>
					</div>
				</div>
				<div className="column">
					<div className="panel bar2">
						<h2>水压</h2>
						<div className="chart">
							<ReactEcharts option={option1} />
						</div>
						<div className="panel-footer"></div>
					</div>
					<div className="panel line2">
						{/* <h2>站点情况</h2> */}
						<div className="chart">
							<ReactEcharts option={option3}></ReactEcharts>
						</div>
						<div className="panel-footer"></div>
					</div>
					<div className="panel pie2">
						<h2>热量-柱形图</h2>
						<div className="chart">
							<ReactEcharts option={option}></ReactEcharts>
						</div>
						<div className="panel-footer"></div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default DataAnalysis;
