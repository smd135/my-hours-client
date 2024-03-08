import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { differenceInHours } from 'date-fns';
import { HiChevronLeft } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from '@nextui-org/react';
import { HiDotsVertical } from 'react-icons/hi';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { fetchById, deleteRoute } from '../redux/features/routesSlice';
import toast from 'react-hot-toast';

const RoutePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const { items } = useSelector((state) => state.routes);
	const diff = items.diff;
	const remainder = diff % 60;

	useEffect(() => {
		dispatch(fetchById(params.id));
	}, []);

	const onDelete = () => {
		if (window.confirm('Ви дійсно хочете видалити це маршрут?')) {
			dispatch(deleteRoute(params.id));
			toast.success('Маршрут успішно видалено');
			navigate('/routes');
		}
	};
	return (
		<div className="container">
			<div className="actionsBar">
				<div>
					<Link to="/routes">
						<button type="button" className="returnButton">
							<HiChevronLeft size={35} color="#fff" />
						</button>
					</Link>
				</div>
				<div>
					<Dropdown>
						<DropdownTrigger>
							<button className="">
								<HiDotsVertical size={35} color="#fff" className="dotsMenu" />
							</button>
						</DropdownTrigger>
						<DropdownMenu className="dropDownMenu" aria-label="Static Actions">
							<DropdownItem className="" key="edit">
								<Link to={`/${params.id}/edit`}>Редагувати маршрут</Link>
							</DropdownItem>
							<DropdownItem onPress={onDelete} key="delete" className="text-danger" color="danger">
								Видалити маршрут
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
			<div className="routeDetailsWrapper">
				<Card className="detailsCard">
					<CardBody className="">
						<div className="detailsWrapper">
							<label htmlFor="">Номер маршрута:</label>
							<span className="text-center">{items.route_num}</span>
						</div>
						<div className="detailsWrapper">
							<label htmlFor="">Початок роботи:</label>
							<span className="text-center">{moment(items.start_at).format('DD/MM/YYYY h:mm')}</span>
						</div>
						<div className="detailsWrapper">
							<label htmlFor="">Кінець роботи:</label>
							<span className="text-center">{moment(items.end_at).format('DD/MM/YYYY h:mm')}</span>
						</div>
						<div className="detailsWrapper">
							<label htmlFor="">Локомотив:</label>
							<span className="text-center">
								{items.engine_type} - {items.engine_num}
							</span>
						</div>
						<div className="detailsWrapper">
							<label htmlFor="">Номер поїзда:</label>
							<span className="text-center">{items.train_num}</span>
						</div>
						<div className="detailsWrapper">
							<label htmlFor="">Час роботи:</label>
							<span className="text-center">
								{differenceInHours(new Date(items.end_at), new Date(items.start_at))}г {remainder ? remainder : ' 0'}хв
							</span>
						</div>
						<div className="detailsWrapper">
							<label htmlFor="">Інше:</label>
							<span className="text-center">{items.route_etc}</span>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};
export default RoutePage;
