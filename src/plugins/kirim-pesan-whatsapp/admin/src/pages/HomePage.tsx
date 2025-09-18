
import { Main, Box, Table, Thead, Tbody, Tr, Td, Th, IconButton } from '@strapi/design-system';

import { Message, ChevronLeft, ChevronRight } from '@strapi/icons';
import { Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';

import { FetchClient, useFetchClient } from '@strapi/strapi/admin';
import { useFetchRoastedBeanOrders, useFetchToolOrders } from './../utils/api';
import { getWhatsAppTemplate_RoastedBeanOrder, getWhatsAppTemplate_ToolOrder } from './../utils/message-template';

const HomePage = () => {
    const fetchClient = useFetchClient();

    return (
		<Main>
			<Box padding={8}>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}
                >
                    <RoastedBean fetchClient={fetchClient} />
                    <CoffeeTool fetchClient={fetchClient} />                
                </Box>
            </Box>
		</Main>
	);
};

const RoastedBean = ({ fetchClient }: { fetchClient: FetchClient }) => {
    const {
        orders,
        isLoading,
        error,
        pagination,
        onPrevious,
        onNext,
        handlePageChange
    } = useFetchRoastedBeanOrders(fetchClient);

	const COL_COUNT = 6;
    const ROW_COUNT = orders.length + 1;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <Main>
                <Box padding={8}>
                    <Typography variant="beta" as="h1">
                        Error: {error}
                    </Typography>
                </Box>
            </Main>
        );
    }

    return (
        <Flex 
            direction={{ initial: "column" }} 
            gap={{ initial: 6 }} 
            alignItems={{ initial: "flex-start"}}
        >
            <Typography variant="alpha">Pesanan Produk Roasted Beans</Typography>
                    
            <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
                <Thead>
                    <Tr>
                        <Th><Typography variant="sigma">Nama Pembeli</Typography></Th>
                        <Th><Typography variant="sigma">Nomor Whatsapp</Typography></Th>
                        <Th><Typography variant="sigma">Alamat</Typography></Th>
                        <Th><Typography variant="sigma">Status</Typography></Th>
                        <Th><Typography variant="sigma">Total Biaya</Typography></Th>
                        <Th><Typography variant="sigma">Tanggal</Typography></Th>
                        <Th><Typography variant="sigma">Aksi</Typography></Th>
                    </Tr>
                </Thead>
                
                <Tbody>
                    {orders.map((order) => (
                        <Tr key={order.documentId}>
                            <Td><Typography textColor="neutral800">{order.nama_pembeli}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.nomor_whatsapp}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.alamat}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.status_pesanan}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.total_biaya}</Typography></Td>
                            <Td><Typography textColor="neutral800">{new Date(order.createdAt).toLocaleDateString()}</Typography></Td>
                                <Td>
                                    <IconButton onClick={() => open(`https://api.whatsapp.com/send/?phone=${order.nomor_whatsapp}&text=${getWhatsAppTemplate_RoastedBeanOrder(order)}`)} label="Kirim Pesan" borderWidth={0}>
                                        <Message />
                                    </IconButton>
                                </Td>
                            </Tr>
                            ))}
                </Tbody>
            </Table>
                
            {pagination && (
                <Flex justifyContent="space-between" paddingTop={4}>
                    <IconButton onClick={() => onPrevious()} label="Kirim Pesan" borderWidth={0}>    
                        <ChevronLeft />
                    </IconButton>

                    {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((pageNumber) => (
                        <Box key={pageNumber} onClick={() => handlePageChange(pageNumber)} padding="4">
                            <Typography>
                                {pageNumber}
                            </Typography>
                        </Box>
                    ))}

                    <IconButton onClick={() => onNext()} label="Kirim Pesan" borderWidth={0}>    
                        <ChevronRight />
                    </IconButton>
                </Flex>
            )}
        </Flex>
    );
}

const CoffeeTool = ({ fetchClient }: { fetchClient: FetchClient }) => {
    const {
        orders,
        isLoading,
        error,
        pagination,
        onPrevious,
        onNext,
        handlePageChange
    } = useFetchToolOrders(fetchClient);

	const COL_COUNT = 6;
    const ROW_COUNT = orders.length + 1;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <Main>
                <Box padding={8}>
                    <Typography variant="beta" as="h1">
                        Error: {error}
                    </Typography>
                </Box>
            </Main>
        );
    }

    return (
        <Flex 
            direction={{ initial: "column" }} 
            gap={{ initial: 6 }} 
            alignItems={{ initial: "flex-start"}}
        >
            <Typography variant="alpha">Pesanan Produk Roasted Beans</Typography>
                    
            <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
                <Thead>
                    <Tr>
                        <Th><Typography variant="sigma">Nama Pembeli</Typography></Th>
                        <Th><Typography variant="sigma">Nomor Whatsapp</Typography></Th>
                        <Th><Typography variant="sigma">Alamat</Typography></Th>
                        <Th><Typography variant="sigma">Status</Typography></Th>
                        <Th><Typography variant="sigma">Total Biaya</Typography></Th>
                        <Th><Typography variant="sigma">Tanggal</Typography></Th>
                        <Th><Typography variant="sigma">Aksi</Typography></Th>
                    </Tr>
                </Thead>
                
                <Tbody>
                    {orders.map((order) => (
                        <Tr key={order.documentId}>
                            <Td><Typography textColor="neutral800">{order.nama_pembeli}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.nomor_whatsapp}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.alamat}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.status_pesanan}</Typography></Td>
                            <Td><Typography textColor="neutral800">{order.total_biaya}</Typography></Td>
                            <Td><Typography textColor="neutral800">{new Date(order.createdAt).toLocaleDateString()}</Typography></Td>
                                <Td>
                                    <IconButton onClick={() => open(`https://api.whatsapp.com/send/?phone=${order.nomor_whatsapp}&text=${getWhatsAppTemplate_RoastedBeanOrder(order)}`)} label="Kirim Pesan" borderWidth={0}>
                                        <Message />
                                    </IconButton>
                                </Td>
                            </Tr>
                            ))}
                </Tbody>
            </Table>
                
            {pagination && (
                <Flex justifyContent="space-between" paddingTop={4}>
                    <IconButton onClick={() => onPrevious()} label="Kirim Pesan" borderWidth={0}>    
                        <ChevronLeft />
                    </IconButton>

                    {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((pageNumber) => (
                        <Box key={pageNumber} onClick={() => handlePageChange(pageNumber)} padding="4">
                            <Typography>
                                {pageNumber}
                            </Typography>
                        </Box>
                    ))}

                    <IconButton onClick={() => onNext()} label="Kirim Pesan" borderWidth={0}>    
                        <ChevronRight />
                    </IconButton>
                </Flex>
            )}
        </Flex>
    );
}

export { HomePage };
