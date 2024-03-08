import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import DotsSpinner from '../components/DotsSpinner';
import toast from 'react-hot-toast';
import { Space } from 'antd';
import { editRoute, fetchById } from '../redux/features/routesSlice';

const EditRoute = () => {
	const { items, status } = useSelector((state) => state.routes);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const [id, setId] = useState('');
	const [route_num, setRoute_num] = useState('');
	const [start_at, setStart_at] = useState('');
	const [end_at, setEnd_at] = useState('');
	const [engine_type, setEngine_type] = useState('');
	const [engine_num, setEngine_num] = useState(0);
	const [train_num, setTrain_num] = useState(0);
	const [route_etc, setRoute_etc] = useState('');

	const fetchRoute = () => {
		setId(items._id);
		setRoute_num(items.route_num);
		setStart_at(items.start_at);
		setEnd_at(items.end_at);
		setEngine_type(items.engine_type);
		setEngine_num(items.engine_num);
		setTrain_num(items.train_num);
		setRoute_etc(items.route_etc);
	};
	console.log(items, status);
	useEffect(() => {
		dispatch(fetchById(params.id));
		fetchRoute();
	}, []);
	// const { route_num, start_at, end_at, engine_type, engine_num, train_num, route_etc } = routeData;
	const submitHandler = (e) => {
		e.preventDefault();
		try {
			const data = {
				id,
				route_num,
				start_at,
				end_at,
				engine_type,
				engine_num,
				train_num,
				route_etc,
			};
			dispatch(editRoute(data));
			toast.success('Маршрут оновлено');
		} catch (error) {
			console.log(error);
		}
	};
	const onCancelEdit = () => {
		console.log('first');
	};
	console.log(status);
	if (status === 'loading') {
		return <DotsSpinner />;
	}
	return (
		<div>
			<form onSubmit={submitHandler} className="addForm w-full mx-auto px-1 py-10">
				<Space direction="vertical" className="w-full py-1.5">
					<label className="text-sm text-white opacity-70">Номер маршрута:</label>
					<input name="route_num" type="number" value={route_num} className="addInput w-full" placeholder="номер маршрута" onChange={(e) => setRoute_num(e.target.value)} />
					<label className="text-sm text-white opacity-70">Початок роботи</label>
					<input type="datetime-local" name="start_at" className="addInput w-full" value={start_at} onChange={(e) => setStart_at(e.target.value)} />
					<label className="text-sm text-white opacity-70">Кінець роботи</label>
					<input type="datetime-local" name="end_at" className="addInput w-full" value={end_at} onChange={(e) => setEnd_at(e.target.value)} />
					<label className="text-sm text-white opacity-70">Локомотив:</label>
					<select name="engine_type" value={engine_type} className="addInput w-full bg-gray-200 border py-1 px-2" onChange={(e) => setEngine_type(e.target.value)}>
						<option value="виберіть локомотив" defaultValue>
							виберіть локомотив
						</option>
						<option value="ВЛ80т">ВЛ80т</option>
						<option value="ВЛ80к">ВЛ80к</option>
						<option value="ЧС4">ЧС4</option>
						<option value="ЧС8">ЧС8</option>
						<option value="ЧМЕ3">ЧМЕ3</option>
						<option value="ВЛ40у">ВЛ40у</option>
					</select>

					<label className="text-sm text-white opacity-70">Номер локомотива:</label>
					<input
						type="number"
						placeholder="номер локомотива"
						style={{ width: '100%' }}
						name="engine_num"
						className="addInput w-full"
						value={engine_num}
						onChange={(e) => setEngine_num(e.target.value)}
					/>

					<label className="text-sm text-white opacity-70">Номер поїзда:</label>
					<input
						type="number"
						placeholder="номер поїзда -"
						style={{ width: '100%' }}
						name="train_num"
						className="addInput w-full"
						value={train_num}
						onChange={(e) => setTrain_num(e.target.value)}
					/>
					<label className="text-sm text-white opacity-70">інше:</label>
					<input
						type="text"
						placeholder="інше"
						style={{ width: '100%' }}
						name="route_etc"
						className="addInput w-full"
						value={route_etc}
						onChange={(e) => setRoute_etc(e.target.value)}
					/>
					<div className="flex justify-between gap-5">
						<button onClick={onCancelEdit} className="flex justify-center w-full items-center mt-2 text-md bg-red-500	 rounded-md py-2 px-4 text-white" type="button">
							Скасувати
						</button>
						<button className="flex w-full justify-center items-center mt-2 text-md bg-emerald-600 rounded-md py-2 px-4 text-white" type="submit">
							Редагувати
						</button>
					</div>
				</Space>
			</form>
		</div>
	);
};
export default EditRoute;
