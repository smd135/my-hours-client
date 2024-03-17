import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHome, HiCollection, HiDocumentAdd } from 'react-icons/hi';
import { logout } from '../redux/features/authSlice';
import { setMonth, setYear, setTotalHours, setFiltered } from '../redux/features/filterSlice';
import { useGetmeQuery } from '../redux/features/usersApiSlice';
import { useGetRoutesQuery } from '../redux/features/routesApiSlice';
import moment from 'moment';

const NavBar = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const { month, year, totalHours } = useSelector((state) => state.filter);
	console.log(totalHours);

	const filteredItems = useSelector((state) => state.filter.items);

	//***********************************************************/
	const hours = Math.floor(totalHours / 60);

	const minutes = totalHours % 60;
	const currentDate = moment.now();
	const currentMonth = moment(currentDate).month() + 1;
	const savedMonth = localStorage.getItem('currentMonth');
	useEffect(() => {
		dispatch(setTotalHours());
	}, [totalHours, dispatch]);
	const onLogout = () => {
		dispatch(logout());
	};

	const splittedName = userInfo ? userInfo.name : null;
	return (
		<>
			{userInfo && (
				<div className="profile mt-3 w-full">
					<div className="flex gap-4">
						<select
							// defaultValue={month}
							onChange={(e) => {
								dispatch(setMonth(e.target.value));
							}}
							name="month"
							value={savedMonth}
							className=" bg-gray-200 border rounded-lg py-1 px-1"
						>
							<option value="місяць">місяць</option>
							<option value="1">Січень</option>
							<option value="2">Лютий</option>
							<option value="3">Березень</option>
							<option value="4">Квітень</option>
							<option value="5">Травень</option>
							<option value="6">Червень</option>
							<option value="7">Липень</option>
							<option value="8">Серпень</option>
							<option value="9">Вересень</option>
							<option value="10">Жовтень</option>
							<option value="11">Листопад</option>
							<option value="12">Грудень</option>
						</select>
						<select name="year" className="bg-gray-200  rounded-lg border py-1 px-1">
							<option value="рік" defaultValue>
								рік
							</option>
							<option value="2024">2024</option>
							<option value="2025">2025</option>
							<option value="2026">2026</option>
						</select>
						<div className="hoursTotal flex items-center">
							<span className="totalHours">{`${hours}г ${minutes}хв`}</span>
						</div>
					</div>
					<div className="profileItem">
						<span className="profileWrapper">
							{/* <span className="name">{splittedName}</span> */}
							<span className="userAvatar">
								{splittedName
									?.toUpperCase()
									.split(' ')
									.map((word) => word.charAt(0))
									.join('')}
							</span>

							<button onClick={onLogout} className="logoutBtn showBtn">
								Вийти
							</button>
						</span>
					</div>
				</div>
			)}

			<nav className="navbar">
				<div className="navbarWrapper">
					<div className="flex justify-between items-center">
						<ul className="flex items-center gap-12">
							<li className="navItem">
								<NavLink to="/" className={({ isActive }) => (isActive ? 'navActive' : 'navRegular')}>
									<HiOutlineHome size={40} color="#fff" />
								</NavLink>
							</li>
							<li className="navItem">
								<NavLink to="/routes" className={({ isActive }) => (isActive ? 'navActive' : 'navRegular')}>
									<HiCollection size={40} color="#fff" />
								</NavLink>
							</li>
							<li className="navItem">
								<NavLink to="/new" className={({ isActive }) => (isActive ? 'navActive' : 'navRegular')}>
									<HiDocumentAdd size={40} color="#fff" />
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
export default NavBar;
