import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';

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
