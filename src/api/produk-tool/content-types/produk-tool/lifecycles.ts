export default {
    async afterCreate(event) {
        await updateVariantDiscount(event.result);
    },

    async afterUpdate(event) {
        if (event.params?.data?._skipDiscount) return;

        await updateVariantDiscount(event.result);
    }
};

async function updateVariantDiscount(result) {
    const populated = await strapi.db
        .query("api::produk-tool.produk-tool")
        .findOne({
            where: { documentId: result.documentId },
        });

    if (!populated) return;

    const harga = Number(result.harga) || 0;
    const diskon = Number(result.diskon) || 0;
    const hargaDiskon = harga - (harga * diskon) / 100;

    const hargaDiskonBulat = Math.round(hargaDiskon / 1000) * 1000;

    await strapi.db
        .query("api::produk-tool.produk-tool")
        .update({
            where: { documentId: result.documentId },
            data: {
                harga_diskon: String(hargaDiskonBulat),
                _skipDiscount: true                
            }
        });
}