import { getCurrentUser } from "@/services/authServices";
import { TUser } from "@/types";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";

type TUserProviderValues = {
	user: TUser | null;
	isLoading: boolean;
	setUser: (user: TUser | null) => void;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<TUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<TUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleUser = async () => {
		const user = await getCurrentUser();
		setUser(user);
		setIsLoading(false);
	};

	useEffect(() => {
		handleUser();
	}, [isLoading]);

	return (
		<UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error("useUser must be used within the UserProvider");
	}

	return context;
};

export default UserProvider;
