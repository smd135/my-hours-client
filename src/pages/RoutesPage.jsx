import { useEffect } from 'react';
import RouteItem from '../components/RouteItem';
import BlankItem from '../components/BlankItem';
import DotsSpinner from '../components/DotsSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFiltered, setTotalHours } from '../redux/features/filterSlice';
import { useGetRoutesQuery } from '../redux/features/routesApiSlice';
import { setRoutes } from '../redux/features/routesSlice';

const RoutesPage = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { items, isUpdated, changed } = useSelector((state) => state.routes);
	const { month } = useSelector((state) => state.filter);
	const filteredItems = useSelector((state) => state.filter.items);
	//*************************************************************
	const { data, isLoading } = useGetRoutesQuery();

	useEffect(() => {
		if (!isLoading) {
			dispatch(setFiltered(data, 3));
		}
	}, [isLoading, changed]);

	// @todo Create new filter reducer to set current month
	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}
	}, [userInfo]);

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

				{isLoading ? <DotsSpinner /> : filteredItems.length === 0 ? <BlankItem text="У вас немає поїздок..." /> : <div className="routeItem">{filteredItems && filteredItems.map((route) => <RouteItem key={route._id} routes={route} />)}</div>}
			</div>
		</div>
	);
};
export default RoutesPage;
