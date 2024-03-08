import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../redux/features/authSlice';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

const RegisterPage = () => {
	const isAuth = useSelector((state) => Boolean(state.auth.data));

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));

		if (!data.payload) {
			return toast.error('Не вдалося зареєструватися!');
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		}
	};
	const onChange = (values) => {
		console.log(values);
	};
	if (isAuth) {
		return <Navigate to="/routes" />;
	}
	return (
		<div>
			<div className="loginWrapper">
				<form className="loginForm mx-auto" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="loginHeader mb-4 text-lg text-white text-center">Реєстрація</h2>
					<div className="inputWrapper">
						<label className="text-sm text-gray-400" htmlFor="">
							Ім&apos;я користувача:
						</label>
						<span className="text-md text-red-600">{errors.username?.message}</span>
						<input
							onChange={onChange}
							name="username"
							type="text"
							placeholder="ім'я користувача"
							className="loginInput"
							{...register('username', { required: 'Введіть ім&apos;я користувача' })}
						/>
					</div>
					<div className="inputWrapper">
						<label className="text-sm text-gray-400" htmlFor="">
							Електронна пошта:
						</label>
						<span className="text-md text-red-600">{errors.email?.message}</span>
						<input onChange={onChange} name="email" type="email" placeholder="електронна пошта" className="loginInput" {...register('email', { required: 'Введіть email' })} />
					</div>
					<div className="inputWrapper inputPassword">
						<label className="text-sm text-gray-400" htmlFor="">
							Пароль:
						</label>
						<span className="text-md text-red-600">{errors.password?.message}</span>
						<input onChange={onChange} name="password" type="password" placeholder="пароль" className="loginInput" {...register('password', { required: 'Введіть пароль' })} />
						{/* <i className="fi fi-rr-key passwordKey"></i> */}
					</div>
					{/* <div className="inputWrapper inputPassword2">
						<label className="text-sm text-gray-400" htmlFor="">
							Пароль:
						</label>
						<span className="text-md text-red-600">{errors.password?.message}</span>
						<input name="password2" type="password" placeholder="введіть пароль ще раз" className="loginInput" {...register('password2', { required: 'Повторіть пароль' })} />
						<i className="fi fi-rr-key passwordKey"></i>
					</div> */}
					<div className="flex gap-8 justify-center mt-4">
						<button className="flex justify-center items-center text-md  text-white rounded-md py-2 px-4">Ввійти</button>
						<button disabled={!isValid} className="flex justify-center items-center text-md bg-emerald-600 rounded-md py-2 px-4 text-white" type="submit">
							Реєстрація
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default RegisterPage;
