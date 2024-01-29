import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProvinceDropdown = ({ onSelect }) => {
    const [provinces, setProvinces] = useState([]);
    const tpHCM = [{ code: '79', name: 'TP.HCM' }];
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
                setProvinces(response.data);

                // const tpHCM = response.data.find(province => province.name === 'TP.HCM');
                // setProvinces(tpHCM ? [tpHCM] : []);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    return (
        <select onChange={(e) => onSelect(e.target.value, e.target.options[e.target.selectedIndex].text)}>
            <option value="">Chọn tỉnh</option>
            {tpHCM.map((province) => (
                <option key={province.code} value={province.code}>
                    {province.name}
                </option>
            ))}
        </select>
    );
};

export default ProvinceDropdown;
