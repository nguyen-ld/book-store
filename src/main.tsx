import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// react route setup

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "antd";

import Layout from "@/layout";
import AboutPage from "pages/client/about";
import BookPage from "pages/client/book";
import HomePage from "pages/client/home";
import LoginPage from "@/pages/client/auth/views/login";
import RegisterPage from "@/pages/client/auth/views/register";

import "styles/global.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,

		children: [
			{ index: true, element: <HomePage /> },
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/book",
				element: <BookPage />,
			},
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App>
			<RouterProvider router={router} />
		</App>
	</StrictMode>
);
