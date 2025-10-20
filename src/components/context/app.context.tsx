import { createContext, useContext, useState } from "react";

interface IAppContext {
	isAuthenticated: boolean;
	user: IUser | null;
	setIsAuthenticated: (v: boolean) => void;
	setUser: (v: IUser) => void;
}

// create context

const CurrentAppContext = createContext<IAppContext | null>(null);

// props

type TProps = {
	children: React.ReactNode;
};

// create a provider

export const AppProvider = (props: TProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | null>(null);

	return (
		<CurrentAppContext.Provider
			value={{ isAuthenticated, user, setIsAuthenticated, setUser }}
		>
			{props.children}
		</CurrentAppContext.Provider>
	);
};

export const useCurrentApp = () => {
	const currentAppContext = useContext(CurrentAppContext);

	if (!currentAppContext) {
		throw new Error(
			"useCurrentApp has to be used within <CurrentAppContext.Provider>"
		);
	}

	return currentAppContext;
};
