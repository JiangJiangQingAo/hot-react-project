import React from "react";
import DataAnalysis from "./DataAnalysis/DataAnalysis";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Routes, Route, Link, Navigate} from "react-router-dom";
import DataMonitoring from "./DataMonitoring/DataMonitoring";
import "./Main.css";
import HomePage from "../Home/HomePage";
import AuthPage from "../Home/AuthPage";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Home/api/authSlice";
const Main = () => {
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	return (
		<div>
			<header>
				{
					auth.isLogged &&
					<>
						<div>{auth.user.username}</div>
						<div><Link to={"/"} onClick={()=>dispatch(logout())}>登出</Link></div>
					</>
				}
				<div className="title">可视化供热系统</div>
				<div className="nav">
					{
						auth.isLogged &&
						<div className="dataAnalysis">
							<Link to="/DataAnalysis">数据分析</Link>
						</div>
					}
					{
						auth.isLogged &&
						<div className="dataMonitoring">
							<Link to="/dataMonitoring">实时数据监测</Link>
						</div>
					}
				</div>
			</header>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="auth-from"
					element={<AuthPage />}
				/>
			</Routes>
			<Routes>
				<Route
					path="dataMonitoring"
					element={
						auth.isLogged?
						<DataMonitoring/>:<Navigate to={"/auth-from"} replace/>
					}
				/>
				<Route
					path="DataAnalysis"
					element={
						auth.isLogged?
						<DataAnalysis/>:<Navigate to={"/auth-from"} replace/>
					}
				/>
			</Routes>
		</div>
		// </Routes>
	);
};

export default Main;
