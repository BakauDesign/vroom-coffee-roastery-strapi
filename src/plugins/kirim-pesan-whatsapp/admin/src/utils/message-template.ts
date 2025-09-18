import { RoastedBeanOrder, ToolOrder } from './types';

export function getWhatsAppTemplate_RoastedBeanOrder(order: RoastedBeanOrder): string {
    const {
        nama_pembeli,
        status_pesanan,
        produk_yang_dibeli,
        total_biaya,
        nama_layanan_pengiriman,
        biaya_pengiriman,
        nomor_resi,
        alamat
    } = order;

    const daftarProduk = produk_yang_dibeli.map(
        item => `- ${item.nama_produk}(${item.varian_kemasan}) x ${item.kuantitas}: Rp${item.varian_harga}`
    ).join('\n');

    const totalBayar = parseInt(total_biaya) + parseInt(biaya_pengiriman);

    switch (status_pesanan) {
        case 'Menunggu Konfirmasi':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*;\n\n` +
                `Terima kasih sudah memesan di Vroom Coffee!\n\n` +
                `*Detail Pesanan*\n${daftarProduk}\n` +
                `Ongkir: Rp${biaya_pengiriman}\n` +
                `Total: Rp${total_biaya}\n\n` +
                `Alamat:\n${alamat}\n\n` +
                `Instruksi pembayaran menyusul via WhatsApp ini.`
            );

        case 'Menunggu Pembayaran':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*!\n\n` +
                `Silakan bayar *Rp${totalBayar}* ke:\n` +
                `BCA 123 888 999 a.n. Vroom Coffee\n\n` +
                `*Detail Pesanan*\n${daftarProduk}\n\n` +
                `Batas waktu: 24 jam.`
            );

        case 'Diproses':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda sedang dipacking. Total: Rp${totalBayar}\n\n` +
                `Kami akan mengirimkan nomor resi segera.`
            );

        case 'Dikirim':
            const namaKurir = nama_layanan_pengiriman || 'Tidak diketahui';
            const nomorResi = nomor_resi || 'Belum tersedia';

            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda sudah dikirim!\n` +
                `*Kurir*: ${namaKurir}\n` +
                `*Resi*: ${nomorResi}\n` +
                `*Total*: Rp${totalBayar}\n\n` +
                `*Alamat*\n${alamat}`
            );

        case 'Selesai':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda sudah selesai. Terima kasih telah berbelanja di Vroom Coffee!\n\n` +
                `*Beri Ulasan*:\n` +
                `Bagikan pengalaman Anda via WhatsApp ini.`
            );

        case 'Dibatalkan':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda dibatalkan karena pembayaran tidak terkonfirmasi.\n\n` +
                `*Ingin memesan lagi?*\n` +
                `Balas pesan ini untuk bantuan.`
            );

        default:
            throw new Error(`Status pesanan tidak valid: ${status_pesanan}`);
    }
}

export function getWhatsAppTemplate_ToolOrder(order: ToolOrder): string {
    const {
        nama_pembeli,
        status_pesanan,
        produk_yang_dibeli,
        total_biaya,
        nama_layanan_pengiriman,
        biaya_pengiriman,
        nomor_resi,
        alamat
    } = order;

    const daftarProduk = produk_yang_dibeli.map(
        item => `- ${item.nama_produk}(${item.varian_kemasan}) x ${item.kuantitas}: Rp${item.varian_harga}`
    ).join('\n');

    const totalBayar = parseInt(total_biaya) + parseInt(biaya_pengiriman);

    switch (status_pesanan) {
        case 'Menunggu Konfirmasi':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*;\n\n` +
                `Terima kasih sudah memesan di Vroom Coffee!\n\n` +
                `*Detail Pesanan*\n${daftarProduk}\n` +
                `Ongkir: Rp${biaya_pengiriman}\n` +
                `Total: Rp${total_biaya}\n\n` +
                `Alamat:\n${alamat}\n\n` +
                `Instruksi pembayaran menyusul via WhatsApp ini.`
            );

        case 'Menunggu Pembayaran':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*!\n\n` +
                `Silakan bayar *Rp${totalBayar}* ke:\n` +
                `BCA 123 888 999 a.n. Vroom Coffee\n\n` +
                `*Detail Pesanan*\n${daftarProduk}\n\n` +
                `Batas waktu: 24 jam.`
            );

        case 'Diproses':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda sedang dipacking. Total: Rp${totalBayar}\n\n` +
                `Kami akan mengirimkan nomor resi segera.`
            );

        case 'Dikirim':
            const namaKurir = nama_layanan_pengiriman || 'Tidak diketahui';
            const nomorResi = nomor_resi || 'Belum tersedia';

            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda sudah dikirim!\n` +
                `*Kurir*: ${namaKurir}\n` +
                `*Resi*: ${nomorResi}\n` +
                `*Total*: Rp${totalBayar}\n\n` +
                `*Alamat*\n${alamat}`
            );

        case 'Selesai':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda sudah selesai. Terima kasih telah berbelanja di Vroom Coffee!\n\n` +
                `*Beri Ulasan*:\n` +
                `Bagikan pengalaman Anda via WhatsApp ini.`
            );

        case 'Dibatalkan':
            return encodeURIComponent(
                `Halo *${nama_pembeli}*\n\n` +
                `Pesanan Anda dibatalkan karena pembayaran tidak terkonfirmasi.\n\n` +
                `*Ingin memesan lagi?*\n` +
                `Balas pesan ini untuk bantuan.`
            );

        default:
            throw new Error(`Status pesanan tidak valid: ${status_pesanan}`);
    }
}