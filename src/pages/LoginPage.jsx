import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { setCredentials } from '../redux/features/authSlice';
import { useLoginMutation } from '../redux/features/usersApiSlice';
import { useEffect } from 'react';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.auth);
	console.log(userInfo);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});
	

	const [login, { isLoading }] = useLoginMutation();
	const onSubmit = async (values) => {
		const { email, password } = values;
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate('/');
		} catch (error) {
			console.log(error?.data?.message || error.error);
			toast.error('Невдала авторизація');
		}

		console.log(values);
	};

	return (
		<div>
			<div className="loginWrapper">
				<form className="loginForm mx-auto" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="loginHeader mb-4 text-lg text-white text-center">Ввійти</h2>
					<div className="inputWrapper">
						<label className="text-sm text-gray-400" htmlFor="">
							Електронна пошта:
						</label>
						<span className="text-md text-red-600">{errors.email?.message}</span>
						<input name="email" type="email" placeholder="електронна пошта" className="loginInput" {...register('email', { required: 'Введіть email' })} />
					</div>
					<div className="inputWrapper">
						<label className="text-sm text-gray-400" htmlFor="">
							Пароль:
						</label>
						<span className="text-md text-red-600">{errors.password?.message}</span>
						<input name="password" type="password" placeholder="пароль" className="loginInput" {...register('password', { required: 'Введіть пароль' })} />
					</div>
					<div className="flex gap-8 justify-center mt-4">
						<button className="flex justify-center items-center text-md  rounded-md py-2 px-4 text-white" type="submit">
							<Link to="/register">Реєстрація</Link>
						</button>
						<button disabled={!isValid} type="submit" className="flex justify-center items-center text-md bg-emerald-600 text-white rounded-md py-2 px-4">
							Ввійти
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default LoginPage;
