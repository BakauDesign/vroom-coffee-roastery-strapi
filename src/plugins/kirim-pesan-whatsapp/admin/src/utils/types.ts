export type InformasiProduk = {
    nama: string;
    deskripsi: string;
    highlight: string | null;
    aktif: boolean;
    highlighted: boolean;
    foto: { url: string; };
}

export type RoastedBeansProduct = {
    documentId: string;
    informasi_produk: InformasiProduk;
    asal: string;
    proses: string;
    catatan_tes: string;
    kemasan: string;
    slug: string;
}

type ProdukYangDibeli = {
    id: number,
    nama_produk: string,
    varian_harga: string,
    kuantitas: number,
    varian_kemasan: string,
    varian_berat: string
}

export type RoastedBeanOrder = {
    documentId: string,
    createdAt: string,
    updatedAt: string,
    nama_pembeli: string,
    nomor_whatsapp: string,
    alamat: string,
    catatan_kurir: string | null,
    nomor_resi: string | null,
    status_pesanan: string,
    nama_layanan_pengiriman: string,
    biaya_pengiriman: string,
    total_biaya: string,
    produk_yang_dibeli: ProdukYangDibeli[];
}

export type ToolOrder = {
    documentId: string,
    createdAt: string,
    updatedAt: string,
    nama_pembeli: string,
    nomor_whatsapp: string,
    alamat: string,
    catatan_kurir: string | null,
    nomor_resi: string | null,
    status_pesanan: string,
    nama_layanan_pengiriman: string,
    biaya_pengiriman: string,
    total_biaya: string,
    produk_yang_dibeli: ProdukYangDibeli[];
}

export type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}