export default {
    async afterCreate(event) {
        await calculateTotalCost(event.result);
    }
};

async function calculateTotalCost(result) {
    const populated = await strapi.db
        .query("api::pesanan-produk-roasted-bean.pesanan-produk-roasted-bean")
        .findOne({
            where: { documentId: result.documentId },
            populate: ["produk_yang_dibeli"],
        });


    let subtotal = 0;
    for (const item of populated.produk_yang_dibeli) {
        subtotal += Number(item.varian_harga) * Number(item.kuantitas);
    }

    const biayaPengiriman = Number(populated.biaya_pengiriman) || 0;

    await strapi.db
        .query("api::pesanan-produk-roasted-bean.pesanan-produk-roasted-bean")
        .update({
            where: { documentId: result.documentId },
            data: {
                total_biaya: String(subtotal + biayaPengiriman),
            },
        });
}