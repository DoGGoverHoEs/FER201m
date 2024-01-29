// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../authentication/Auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://firstrealestate-001-site1.anytempurl.com/api/account/login',
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                        accept: '*/*',
                    },
                }
            );

            const { accessToken, userLoginBasicInformationDto } = response.data;

            // Lưu thông tin vào localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userLoginBasicInformationDto', JSON.stringify(userLoginBasicInformationDto));

            // Lưu token vào Auth
            saveToken(accessToken);

            console.log('Login successful. Token:', accessToken);

            // Navigate to the Home page after successful login
            navigate('/home2');
            window.location.reload();

        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div className='form-dangnhap'>
            <h2 className='text-dangnhap'>ĐĂNG NHẬP</h2>
            <div className='dangki'>
                <span className='text-dangki'>Nếu bạn chưa tài khoản,</span>
                <a className='link-dangki' href='dangki'>đăng kí tại đây</a>
            </div>
            <div className='dangnhap'>
                <input className='button-login'
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input className='button-login'
                    type="password"
                    placeholder="Mật Khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='button-submit' onClick={handleLogin}>Đăng Nhập</button>

            </div>
            <div className='re-fo'>
                <div className='remember-login'>
                    <input type='checkbox'></input>
                    <span>Ghi nhớ đăng nhập</span>
                </div>
                <a className='forget-pass' href='quenmatkhau'>Quên mật khẩu</a>
            </div>
            <span className='dangnhapkhac'>Hoặc đăng nhập bằng</span>
        </div>
    );
};

export default Login;
