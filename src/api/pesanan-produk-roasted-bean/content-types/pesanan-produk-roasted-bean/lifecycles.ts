export default {
    async afterCreate(event) {
        await calculateTotalCost(event.result);
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        if (data && data._skipTotalCostUpdate) {
            delete data._skipTotalCostUpdate;
            return;
        }

        const populated = await strapi.db
            .query("api::pesanan-produk-roasted-bean.pesanan-produk-roasted-bean")
            .findOne({
                where: { documentId: event.params.where.documentId },
                populate: ["produk_yang_dibeli"],
            });
        
        const updatedData = { ...populated, ...data };

        await calculateTotalCost(updatedData);

        event.params.data._skipTotalCostUpdate = true;
    }
};

async function calculateTotalCost(result) {
    // Ambil data lengkap dengan populate
    const populated = await strapi.db
        .query("api::pesanan-produk-roasted-bean.pesanan-produk-roasted-bean")
        .findOne({
            where: { documentId: result.documentId },
            populate: ["produk_yang_dibeli"],
        });

    let subtotal = 0;
    if (populated.produk_yang_dibeli) {
        for (const item of populated.produk_yang_dibeli) {
            subtotal += Number(item.varian_harga) * Number(item.kuantitas);
        }
    }

    const biayaPengiriman = Number(populated.biaya_pengiriman) || 0;

    await strapi.db
        .query("api::pesanan-produk-roasted-bean.pesanan-produk-roasted-bean")
        .update({
            where: { documentId: result.documentId },
            data: {
                total_biaya: String(subtotal + biayaPengiriman),
                _skipTotalCostUpdate: true
            },
        });
}