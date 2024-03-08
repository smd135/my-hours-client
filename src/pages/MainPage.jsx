import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashBoard from '../components/DashBoard';

const MainPage = () => {
	const isAuth = useSelector((state) => Boolean(state.auth.data));

	if (!isAuth) {
		return <Navigate to="/login" />;
	}
	return (
		<div style={{ padding: '5px' }} className="container">
			<DashBoard />
		</div>
	);
};
export default MainPage;
