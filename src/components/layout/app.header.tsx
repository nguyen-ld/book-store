import { useCurrentApp } from "../context/app.context";

const AppHeader = () => {
	const { user } = useCurrentApp();

	console.log(">>> check user", user);

	return (
		<div>
			app header
			<div>{JSON.stringify(user?.fullName)}</div>
		</div>
	);
};

export default AppHeader;
