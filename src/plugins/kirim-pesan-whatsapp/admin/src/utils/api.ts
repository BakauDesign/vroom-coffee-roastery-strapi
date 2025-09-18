import { FetchClient } from '@strapi/strapi/admin';
import { useState, useEffect } from 'react';
import { Pagination, RoastedBeanOrder, ToolOrder } from './types';

export const useFetchRoastedBeanOrders = (fetchClient: FetchClient) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const [orders, setOrders] = useState<RoastedBeanOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { get } = fetchClient;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    
    const onPrevious = () => {
        if ((pagination?.pageCount || 0) > 1) {
            setPage((currentPage) => currentPage - 1);
        }
    }

    const onNext = () => {
        setPage((currentPage) => {
            if (currentPage < (pagination?.pageCount || 0)) {
                return currentPage + 1
            }
            return currentPage;
        });
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await get(`/content-manager/collection-types/api::pesanan-produk-roasted-bean.pesanan-produk-roasted-bean?page=${page}&pageSize=${pageSize}`);

                setOrders(response.data.results);
                setPagination(response.data.pagination);
            } catch (err) {
                console.error('Failed to fetch orders', err);
                setError('Gagal mengambil data pesanan.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [get, page, pageSize]);

    return {
        orders,
        isLoading,
        error,
        pagination,
        page,
        pageSize,
        onPrevious,
        onNext,
        handlePageChange,
        handlePageSizeChange
    };
};

export const useFetchToolOrders = (fetchClient: FetchClient) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const [orders, setOrders] = useState<RoastedBeanOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { get } = fetchClient;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    
    const onPrevious = () => {
        if ((pagination?.pageCount || 0) > 1) {
            setPage((currentPage) => currentPage - 1);
        }
    }

    const onNext = () => {
        setPage((currentPage) => {
            if (currentPage < (pagination?.pageCount || 0)) {
                return currentPage + 1
            }
            return currentPage;
        });
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await get(`/content-manager/collection-types/api::pesanan-produk-tool.pesanan-produk-tool?page=${page}&pageSize=${pageSize}`);

                setOrders(response.data.results);
                setPagination(response.data.pagination);
            } catch (err) {
                console.error('Failed to fetch orders', err);
                setError('Gagal mengambil data pesanan.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [get, page, pageSize]);

    return {
        orders,
        isLoading,
        error,
        pagination,
        page,
        pageSize,
        onPrevious,
        onNext,
        handlePageChange,
        handlePageSizeChange
    };
};