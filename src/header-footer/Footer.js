import React from 'react';
import footerItems from '../list/footerItems';
import 'bootstrap/dist/css/bootstrap.min.css';
import duanfooter from '../list/duanfooter';
import dichvufooter from '../list/dichvufooter';
const FooterItem = ({ logoSrc, title, content }) => (
    <div className='list-item'>
        <img className='logo-item' src={logoSrc} alt='' />
        <span className='text-item'>{title}</span>
        <span className='text-item'>{content}</span>
    </div>
);

export default function Footer() {
    return (
        <div>
            <div className='footer-container'>
                <div className='footer1'>
                    {footerItems.map((item, index) => (
                        <FooterItem key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className='footer2'>
                <div className='row'>
                    <div className="col-md-3">
                        <div className='part1'>
                            <img className='lgo-bds' src='./logofooter/logo-footer-batdongsan.png' alt='' />
                            <span className='text-intro'>Sứ mệnh của Pass Môn là đặt chất lượng<br /> cuộc sống khách hàng trở thành ưu tiên<br /> số 1 để đem lại sự an tâm và lợi ích phát<br /> triển cho khách hàng, góp phần tích cực<br /> vào một xã hội.</span>
                        </div>
                    </div>
                    <div className="col-md-3 duan">
                        <div className='list'>
                            <h5 className='text-duan'>Dự Án</h5>
                            <hr className='divider' />
                            <div className='project-list'>
                                {duanfooter.map((project) => (
                                    <a key={project.id} href={project.link} className='project-link'>
                                        {project.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 dichvu">
                        <div className='list'>
                            <h5 className='text-dichvu'>Dịch vụ</h5>
                            <hr className='divider' />
                            <div className='project-list'>
                                {dichvufooter.map((project) => (
                                    <a key={project.id} href={project.link} className='project-link'>
                                        {project.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 email">
                        <div className='list'>
                            <h5 className='text-email'>Email</h5>
                            <hr className='divider' />
                            <span className='text-email'>Đăng ký Email để nhận tin tức mới nhất <br /> về các dự án.</span>
                            <div className='buton-email'>
                                <input className='input-email' placeholder='Email của bạn'></input>
                                <button className='submit-email'>
                                    <img src='logofooter/logo_submit.png' alt='asd' className="button-image" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
