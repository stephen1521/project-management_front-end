import './App.css';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';

function App() {
	const router = createBrowserRouter([
		{
		  	path: "/",
		  	element: <Layout />,
		  	children: []
		}
	])
  	return (
		<div className="App-header">
			<RouterProvider router={router} />
	  	</div>
  	);
}

export default App;
