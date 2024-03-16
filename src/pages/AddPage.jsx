import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Space } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAddrouteMutation } from '../redux/features/routesApiSlice';
// import {setRoutes} from '../redux/features/routesSlice'

const AddPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [routes, isLoading] = useAddrouteMutation();
	const [routeData, setRouteData] = useState({
		route_num: '',
		start_at: '',
		end_at: '',
		engine_type: '',
		engine_num: '',
		train_num: '',
		route_etc: '',
	});
	const { route_num, start_at, end_at, engine_type, engine_num, train_num, route_etc } = routeData;
	const onChange = (e) => {
		setRouteData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		try {
			routes({ route_num, start_at, end_at, engine_type, engine_num, train_num, route_etc });
			// setRouteData({ route_num: '', start_at: '', end_at: '', engine_type: '', engine_num: '', train_num: '', route_etc: '' });
			toast.success('Маршрут успішно додано!');
			navigate('/routes');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<form onSubmit={submitHandler} className="addForm w-full mx-auto px-1 py-10">
				<Space direction="vertical" className="w-full py-1.5">
					<label className="text-sm text-white opacity-70">Номер маршрута:</label>
					<input name="route_num" type="number" value={route_num} className="addInput w-full" size="default" placeholder="номер маршрута" onChange={onChange} />
					<label className="text-sm text-white opacity-70">Початок роботи</label>
					<input type="datetime-local" name="start_at" className="addInput w-full" value={start_at} onChange={onChange} />
					<label className="text-sm text-white opacity-70">Кінець роботи</label>
					<input type="datetime-local" name="end_at" className="addInput w-full" value={end_at} onChange={onChange} />
					<label className="text-sm text-white opacity-70">Локомотив:</label>
					<select name="engine_type" value={engine_type} className="addInput w-full bg-gray-200 border py-1 px-2" onChange={onChange}>
						<option value="виберіть локомотив" defaultValue>
							виберіть локомотив
						</option>
						<option value="ВЛ80т">ВЛ80т</option>
						<option value="ВЛ80к">ВЛ80к</option>
						<option value="ВЛ40у">ВЛ40у</option>
						<option value="ЧС4">ЧС4</option>
						<option value="ЧС8">ЧС8</option>
						<option value="ЧМЕ3">ЧМЕ3</option>
					</select>

					<label className="text-sm text-white opacity-70">Номер локомотива:</label>
					<input type="text" placeholder="номер локомотива" style={{ width: '100%' }} name="engine_num" className="addInput w-full" value={engine_num} onChange={onChange} />

					<label className="text-sm text-white opacity-70">Номер поїзда:</label>
					<input type="text" placeholder="номер поїзда" style={{ width: '100%' }} name="train_num" className="addInput w-full" value={train_num} onChange={onChange} />
					<label className="text-sm text-white opacity-70">інше:</label>
					<input type="text" placeholder="інше" style={{ width: '100%' }} name="route_etc" className="addInput w-full" value={route_etc} onChange={onChange} />
					<div className="flex justify-between gap-5">
						<button className="flex justify-center w-full items-center mt-2 text-md bg-red-500	 rounded-md py-2 px-4 text-white" type="button">
							Скасувати
						</button>
						<button className="flex w-full justify-center items-center mt-2 text-md bg-emerald-600 rounded-md py-2 px-4 text-white" type="submit">
							Додати
						</button>
					</div>
				</Space>
			</form>
		</div>
	);
};
export default AddPage;
