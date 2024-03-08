import { Space } from 'antd';
import { useState } from 'react';
import { createNext } from '../redux/features/routesSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const DashBoard = () => {
	const dispatch = useDispatch();
	const [showDialog, setShowDialog] = useState(false);
	const addHandler = () => {
		setShowDialog((state) => !state);
	};
	const [nextData, setNextData] = useState({
		next_at: '',
		next_etc: '',
	});
	const { next_at, next_etc } = nextData;
	const onInputChange = (e) => {
		setNextData((state) => ({ ...state, [e.target.name]: e.target.value }));
	};
	const submitHandler = () => {
		dispatch(createNext(nextData));
		toast.success('Наступну поїздку заплановано');
	};
	console.log(nextData);
	return (
		<div className="dashboardWrapper">
			<span>Наступна поїздка:</span>
			<div className="nextContainer">
				<div className="nextWrapper">
					<span className="nextDate">07.03.2024 14:14</span>
					<span className="nextDest">Кременчук</span>
					<span className="nextDetails">6535/6536</span>
					<span className="nextActions">
						<button>
							<i className="fi fi-rr-pencil"></i>
						</button>
						<button>
							<i style={{ fontSize: '14px' }} className="fi fi-br-cross"></i>
						</button>
					</span>
				</div>
				<div className="addWrapper">
					<button onClick={addHandler} className="addNext flex justify-center">
						Додати наступну поїздку
					</button>
					<div className={showDialog ? 'showDialog' : 'hide'}>
						<Space direction="vertical" className="w-full py-1.5">
							<form>
								<label className="text-sm text-white opacity-70">дата роботи</label>
								<input type="datetime-local" name="next_at" className="addInput w-full" onChange={onInputChange} value={next_at} />
								<label className="text-sm text-white opacity-70">інше:</label>
								<input type="text" placeholder="інше" style={{ width: '100%' }} name="next_etc" onChange={onInputChange} value={next_etc} className="addInput w-full" />
								<div className="flex justify-between gap-5">
									<button
										onClick={() => {
											setShowDialog(false);
										}}
										className="flex justify-center w-full items-center mt-2 text-md bg-red-500	 rounded-md py-2 px-4 text-white"
										type="button"
									>
										Скасувати
									</button>
									<button onClick={submitHandler} className="flex w-full justify-center items-center mt-2 text-md bg-emerald-600 rounded-md py-2 px-4 text-white" type="submit">
										Додати
									</button>
								</div>
							</form>
						</Space>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashBoard;
