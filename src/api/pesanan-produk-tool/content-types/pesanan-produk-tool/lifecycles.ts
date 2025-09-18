export default {
    async afterCreate(event) {
        await calculateTotalCost(event.result.documentId);
    },

    async beforeUpdate(event) {
        if (event.params?.data?._skipTotalCostUpdate) {
            delete event.params.data._skipTotalCostUpdate;
            return;
        }

        const populated = await strapi.db
            .query("api::pesanan-produk-tool.pesanan-produk-tool")
            .findOne({
                where: { documentId: event.params.where.documentId },
                populate: ["produk_yang_dibeli"],
            });

        const updatedData = event.params.data;

        const combinedData = {
            ...populated,
            ...updatedData
        };

        await calculateTotalCost(combinedData.documentId);
    }
};

async function calculateTotalCost(documentId: string) {
    const populated = await strapi.db
            .query("api::pesanan-produk-tool.pesanan-produk-tool")
            .findOne({
                where: { documentId: documentId },
                populate: ["produk_yang_dibeli"],
            });

    if (!populated?.produk_yang_dibeli) return;

    console.info(populated)

    let subtotal = 0;
    for (const item of populated.produk_yang_dibeli) {
        subtotal += parseInt(item.varian_harga) * item.kuantitas;
    }

    const biayaPengiriman = parseInt(populated.biaya_pengiriman) || 0;
    const totalBiaya = subtotal + biayaPengiriman;

    await strapi.db
        .query("api::pesanan-produk-tool.pesanan-produk-tool")
        .update({
            where: { documentId: documentId },
            data: {
                total_biaya: String(totalBiaya),
                _skipTotalCostUpdate: true,
            },
        });
}