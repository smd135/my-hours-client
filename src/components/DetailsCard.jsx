import { Card, CardBody } from '@nextui-org/react';
import moment from 'moment';
import { differenceInMinutes, differenceInHours } from 'date-fns';

const DetailsCard = ({ routes }) => {
	const difference = differenceInMinutes(new Date(routes.end_at), new Date(routes.start_at));
	const remainder = routes.diff % 60;
	return (
		<Card className="detailsCard">
			<CardBody className="">
				<div className="detailsWrapper">
					<label htmlFor="">Номер маршрута:</label>
					<span className="text-center">{routes.route_num}</span>
				</div>
				<div className="detailsWrapper">
					<label htmlFor="">Початок роботи:</label>
					<span className="text-center">{moment(routes.start_at).format('DD/MM/YYYY h:mm')}</span>
				</div>
				<div className="detailsWrapper">
					<label htmlFor="">Кінець роботи:</label>
					<span className="text-center">{moment(routes.end_at).format('DD/MM/YYYY h:mm')}</span>
				</div>
				<div className="detailsWrapper">
					<label htmlFor="">Локомотив:</label>
					<span className="text-center">
						{routes.engine_type} - {routes.engine_num}
					</span>
				</div>
				<div className="detailsWrapper">
					<label htmlFor="">Номер поїзда:</label>
					<span className="text-center">{routes.train_num}</span>
				</div>
				<div className="detailsWrapper">
					<label htmlFor="">Час роботи:</label>
					{/* <span className="text-center">
            {differenceInHours(new Date(routes.end_at), new Date(routes.start_at))}г {routes.diff ? routes.diff : ' 0'}хв
         </span> */}
					<span className="text-center">{remainder ? remainder : ' 0'}хв</span>
				</div>

				<div className="detailsWrapper">
					<label htmlFor="">Інше:</label>
					<span className="text-center">{routes.route_etc}</span>
				</div>
			</CardBody>
		</Card>
	);
};

export default DetailsCard;
