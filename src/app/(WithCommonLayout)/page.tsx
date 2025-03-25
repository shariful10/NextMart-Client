import { getCurrentUser } from "@/services/authServices";

const HomePage = async () => {
	const user = await getCurrentUser();
	console.log(user);

	return (
		<div>
			<h1>Welcome to NextMart Home page</h1>
		</div>
	);
};

export default HomePage;
