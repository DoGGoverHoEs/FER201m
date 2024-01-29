import React, { useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../authentication/Auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocationSelector from '../location/LocationSelector';
import Avatar from "@mui/material/Avatar";
import { storage } from "../firebase/addimage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Home = () => {
    const [selectedLocation, setSelectedLocation] = useState({
        provinceCode: '',
        provinceName: '',
        districtCode: '',
        districtName: '',
        wardCode: '',
        wardName: '',
    });

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        console.log('Selected Location:', location);
    };

    const accessToken = getToken();
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userLoginBasicInformationDto');
        // Navigate to the Login page after logout
        navigate('/login');
    };

    const [propertyInfo, setPropertyInfo] = useState({
        realestateName: '',
        address: '',
        roomNumber: '',
        description: '',
        length: '',
        width: '',
        area: '',
        roomNumber: '',
        price: '',
        discount: '',

    });

    const [image, setImage] = useState(null);
    const [ur, setUr] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const submitDataToSwagger = async () => {
        try {
            const hardcodedValues = {
                "firebaseId": "TestApi10",
                "investorId": 2,
                "payId": 1,
                "locationId": 0,
                "directId": 2,
                "perimeter": "50",
                "legalStatus": "Sổ Đỏ",
                "status": true,
                "ward": selectedLocation.wardName,
                "district": selectedLocation.districtName,
                "city": selectedLocation.provinceName,
            };

            const dataToSubmit = {
                ...hardcodedValues,
                ...propertyInfo,
                //   location: selectedLocation,
                //   image: ur,

            };

            console.log('Selected Location:', selectedLocation);
            console.log('City:', selectedLocation.provinceName);
            console.log('District:', selectedLocation.districtName);
            console.log('Ward:', selectedLocation.wardName);

            console.log('Data to submit:', dataToSubmit);
            await axios.post(
                'http://firstrealestate-001-site1.anytempurl.com/api/invester/createNewRealEstate/2',
                dataToSubmit,
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json-patch+json',
                    },
                }
            );

            console.log('Data pushed to Swagger successfully.');

        } catch (error) {
            console.error('Failed to push data to Swagger:', error.message);
        }
    };

    const handleSubmitImage = () => {
        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((imageUrl) => {
                        setUr(imageUrl);
                    })
                    .catch((error) => {
                        console.log(error.message, "error getting the image URL");
                    });
                setImage(null);
            })
            .catch((error) => {
                console.error('Failed to upload image:', error.message);
            });
    };

    const handleSubmitData = async () => {
        try {
            await submitDataToSwagger();

            // Optionally, you can reset the form or perform any other actions after successful submission
            setPropertyInfo({
                realestateName: '',
                address: '',
                roomNumber: '',
                description: '',
                length: '',
                width: '',
                area: '',
                roomNumber: '',
                price: '',
                discount: '',

            });

            console.log('Data submitted to Swagger successfully!');
        } catch (error) {
            console.error('Failed to submit data:', error.message);
        }
    };

    return (
        <div className='container'>
            <div className="col-md-3 account">
                <span>Welcome, {userLoginBasicInformationDto.username}!</span>
                <span>Your role is: {userLoginBasicInformationDto.roleName}</span>
                <button className='buuton-logout' onClick={handleLogout}>Logout</button>
            </div>
            <div className="col-md-9 a">
                <div className='thongitnbatdongsan'>
                    <span className='tieude'>Thông tin tin cơ bản</span>
                    <span>Tên bất động sản</span>
                    <input
                        type="text"
                        value={propertyInfo.realestateName}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, realestateName: e.target.value })}
                    />
                    <span>Địa chỉ</span>
                    <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                    <span>Số nhà</span>
                    <input
                        type="text"
                        value={propertyInfo.roomNumber}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, roomNumber: e.target.value })}
                    />
                </div>
                <div className='thongtinbaiviet'>
                    <span className='tieude'>Thông tin bài viết</span>
                    <span>Mô tả</span>
                    <textarea
                        value={propertyInfo.description}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, description: e.target.value })}
                    ></textarea>
                </div>
                <div className='thongtinbatdongsan1'>
                    <span className='tieude'>Thông tin bất động sản</span>
                    <span>Chiều dài</span>
                    <input
                        type="text"
                        value={propertyInfo.length}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, length: e.target.value })}
                    />
                    <span>Chiều rộng</span>
                    <input
                        type="text"
                        value={propertyInfo.width}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, width: e.target.value })}
                    />
                    <span>Diện tích</span>
                    <input
                        type="text"
                        value={propertyInfo.area}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, area: e.target.value })}
                    />
                    <span>Số phòng</span>
                    <input
                        type="text"
                        value={propertyInfo.roomNumber}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, roomNumber: e.target.value })}
                    />
                    <span>Mức giá</span>
                    <input
                        type="text"
                        value={propertyInfo.price}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, price: e.target.value })}
                    />
                    <span>Chiết Khấu</span>
                    <input
                        type="text"
                        value={propertyInfo.discount}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, discount: e.target.value })}
                    />
                    <span>Hình ảnh giấy tờ</span>
                    <div className="Apps">
                        <Avatar src={ur} sx={{ width: 300, height: 300 }} variant="square" />
                        <input type="file" onChange={handleImageChange} />
                        <button onClick={handleSubmitImage}>Submit</button>
                    </div>
                    <span>Hình ảnh thực tế</span>
                    <div className="Apps">
                        <Avatar src={ur} sx={{ width: 300, height: 300 }} variant="square" />
                        <input type="file" onChange={handleImageChange} />
                        <button onClick={handleSubmitImage}>Submit</button>
                    </div>
                    <button onClick={handleSubmitData}>ĐĂNG TIN</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
