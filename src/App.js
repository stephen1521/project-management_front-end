import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
	const router = createBrowserRouter([
		{
		  	path: "/",
		  	element: <Layout />,
		  	children: [
				{
					index: true,
					element: <LandingPage />
				},
				{
					path: 'login',
					element: <LoginPage />
				},
				{
					path: 'registration',
					element: <RegistrationPage />
				},
				{
					path: 'homepage',
					element: <HomePage />
				}
			]
		}
	])
  	return (
		<div className="App-header">
			<RouterProvider router={router} />
	  	</div>
  	);
}

export default App;
