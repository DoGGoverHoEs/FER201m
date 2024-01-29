// ResultTable.js
import React from 'react';

const ResultTable = ({ selectedLocation }) => {
    if (!selectedLocation) {
        return <div>No location selected</div>;
    }

    const { provinceName, districtName, wardName } = selectedLocation;

    return (
        <div>
            <h2>Selected Location</h2>
            <table>
                <thead>
                    <tr>
                        <th>Province</th>
                        <th>District</th>
                        <th>Ward</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{provinceName || 'N/A'}</td>
                        <td>{districtName || 'N/A'}</td>
                        <td>{wardName || 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
