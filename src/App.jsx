import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import RoutesPage from './pages/RoutesPage';
import RoutePage from './pages/RoutePage';
import AddPage from './pages/AddPage';
import EditRoute from './pages/EditRoute';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
function App() {
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (userInfo) {
			navigate('/routes');
		}
	}, [userInfo]);
	return (
		<>
			<Layout>
				<Toaster />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/routes" element={<RoutesPage />} />
					<Route path=":id" element={<RoutePage />} />
					<Route path="/new" element={<AddPage />} />
					<Route path=":id/edit" element={<EditRoute />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
