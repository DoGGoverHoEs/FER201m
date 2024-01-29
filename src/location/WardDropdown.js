import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WardDropdown = ({ districtCode, onSelect }) => {
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const fetchWards = async () => {
            if (!districtCode) {
                setWards([]);
                return;
            }

            try {
                const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
                setWards(response.data.wards);
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };

        fetchWards();
    }, [districtCode]);

    return (
        <select onChange={(e) => onSelect(e.target.value, e.target.options[e.target.selectedIndex].text)}>
            <option value="">Chọn phường</option>
            {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                    {ward.name}
                </option>
            ))}
        </select>
    );
};

export default WardDropdown;