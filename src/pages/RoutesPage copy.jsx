import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RouteItem from '../components/RouteItem';
import { getAllRoutes } from '../redux/features/routes/routeSlice';
import { Spinner } from '@nextui-org/react';

const RoutesPage = () => {
	const dispatch = useDispatch();
	const { routes } = useSelector((state) => state.route);

	useEffect(() => {
		dispatch(getAllRoutes());
	}, [dispatch]);
	if (!routes.length) {
		return (
			<div className="spinnerWrapper" style={{ fontWeight: '600', letterSpacing: '0.02rem', padding: '5px' }}>
				Немає маршрутів!
				{/* <Spinner color="#fff" size="lg" /> */}
			</div>
		);
	}
	return (
		<div className=" mx-auto py-3">
			<div className="routesHeader">
				<p>Початок</p>
				<p>Кінець</p>
				<p>Всього</p>
				<p>Інше</p>
				<p>Дії</p>
			</div>
			<div className="routeItem">
				{routes?.map((route) => (
					<RouteItem key={route._id} route={route} />
				))}
			</div>
		</div>
	);
};
export default RoutesPage;
