import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistrictDropdown = ({ provinceCode, onSelect }) => {
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!provinceCode) {
                setDistricts([]);
                return;
            }

            try {
                const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
                setDistricts(response.data.districts);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        fetchDistricts();
    }, [provinceCode]);

    return (
        <select onChange={(e) => onSelect(e.target.value, e.target.options[e.target.selectedIndex].text)}>
            <option value="">Chọn quận</option>
            {districts.map((district) => (
                <option key={district.code} value={district.code}>
                    {district.name}
                </option>
            ))}
        </select>
    );
};

export default DistrictDropdown;