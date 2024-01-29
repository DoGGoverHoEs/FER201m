import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import duan from '../list/duan';
import tintuc from '../list/tintuc';

export default function Header() {
    return (
        <div className='header-container'>
            <div className="col-md-9">
                <nav className='main-menu'>
                    <ul className='menu-list'>
                        <img className='logo-batdongsan' src='./logoheader/logo-header-batdongsan.png' alt='' />
                        <li><Link className='menu-item' to='/trangchu'>Trang chủ</Link></li>
                        <li><Link className='menu-item' to='/gioithieu'>Giới Thiệu</Link></li>
                        <li className='dropdown'>
                            <Link className='menu-item' to='/tintuc'>Tin Tức</Link>
                            <ul className='dropdown-menu'>
                                {tintuc.map((tintuc) => (
                                    <li key={tintuc.id}><Link className='text-drop' to={tintuc.link}>{tintuc.title}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li className='dropdown'>
                            <Link className='menu-item' to='/duan'>Dự Án</Link>
                            <ul className='dropdown-menu'>
                                {duan.map((duan) => (
                                    <li key={duan.id}><Link className='text-drop' to={duan.link}>{duan.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li><Link className='menu-item' to='/lienhe'>Liên Hệ</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="col-md-3 header">
                <img className='logo_notification' src='./logoheader/logo_notification.png' alt='' />
                <div className="container-login">
                    <img className='logo-taikhoan' src='./logoheader/logo_taikhoan.png' alt='' />
                    <Link className='login-link' to='/dangnhap'>Đăng Nhập</Link>
                </div>
            </div>
        </div>
    )
}
