import { Link } from 'react-router-dom';
import moment from 'moment';
import { differenceInMinutes, differenceInHours } from 'date-fns';

function RouteItem({ routes }) {
	const diff = differenceInMinutes(new Date(routes.end_at), new Date(routes.start_at));
	const remainder = diff % 60;
	return (
		<>
			<div className="routesWrapper">
				<Link to={`/${routes._id}`} className="">
					<span className="flex items-center justify-center text-center">{moment(routes.start_at).format('DD/MM/YYYY h:mm')}</span>
				</Link>
				<Link to={`/${routes._id}`} className="">
					<span className="flex items-center justify-center text-center">{moment(routes.end_at).format('DD/MM/YYYY h:mm')}</span>
				</Link>
				<Link to={`/${routes._id}`} className="flex items-center justify-center text-center">
					<span>
						{differenceInHours(new Date(routes.end_at), new Date(routes.start_at))}г {remainder ? remainder : ' 0'}хв
					</span>
				</Link>
				<Link to={`/${routes._id}`} className="flex items-center justify-center text-center">
					<span className="flex items-center justify-center text-center">{routes.route_etc}</span>
				</Link>
			</div>
		</>
	);
}
export default RouteItem;
