'use client';

import { useEffect, useState } from 'react';
import TableVehicleList from './components/tableVehicle';
import { Vehicle } from '@/type/types';

interface VehicleListResponse {
    data: Vehicle[];
    metadata: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

const VehicleListPage = () => {
    const [vehicles, setVehicles] = useState<VehicleListResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [limit] = useState(10);

    const fetchVehicles = async () => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search && { search }),
                ...(filter && { filter })
            });

            const response = await fetch(`/api/vehicles/list?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, [page, search, filter]);

    return (

        <TableVehicleList
            data={vehicles?.data || []}
            metadata={vehicles?.metadata}
            loading={loading}
            onPageChange={setPage}
            onSearch={setSearch}
            onFilter={setFilter}
        />
    );
};

export default VehicleListPage;
