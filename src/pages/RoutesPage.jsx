import { useEffect } from 'react';
import RouteItem from '../components/RouteItem';
import BlankItem from '../components/BlankItem';
import DotsSpinner from '../components/DotsSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoutes } from '../redux/features/routesSlice';
import { Navigate } from 'react-router-dom';
import { setFiltered, setTotalHours } from '../redux/features/filterSlice';

const RoutesPage = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => Boolean(state.auth.data));
	const { items, status, isUpdated } = useSelector((state) => state.routes);
	const { month } = useSelector((state) => state.filter);
	const filteredItems = useSelector((state) => state.filter.items);
	//*************************************************************
	useEffect(() => {
		dispatch(fetchRoutes());
		if (items.length > 0) dispatch(setFiltered(items, month));
		dispatch(setTotalHours());
	}, [isUpdated]);

	// @todo Create new filter reducer to set current month

	if (!isAuth) {
		return <Navigate to="/login" />;
	}
	if (status === 'loading') {
		return <DotsSpinner />;
	}
	return (
		<div className="mx-auto mt-10 py-3">
			<div>
				<div className="flex justify-end">
					<p className="routesCount">{filteredItems ? filteredItems.length : '0'}</p>
				</div>
				<div className="routesHeader">
					<p>Початок</p>
					<p>Кінець</p>
					<p>Всього</p>
					<p>Інше</p>
				</div>
				{items.length > 0 ? (
					<div className="routeItem">{filteredItems && filteredItems.map((route) => <RouteItem key={route._id} routes={route} />)}</div>
				) : (
					<BlankItem text="У вас немає поїздок..." />
				)}
			</div>
		</div>
	);
};
export default RoutesPage;
