export default {
    async afterCreate(event) {
        await updateVariantDiscount(event.result.documentId);
    },

    async afterUpdate(event) {
        if (event.params?.data?._skipDiscount) return;

        await updateVariantDiscount(event.result.documentId);
    }
};

async function updateVariantDiscount(documentId: string) {
    const populated = await strapi.db
        .query("api::produk-roasted-bean.produk-roasted-bean")
        .findOne({
            where: { documentId: documentId },
            populate: ["daftar_varian_kemasan"],
        });

    if (!populated?.daftar_varian_kemasan) return;

    const updates = populated.daftar_varian_kemasan.map(async (varian: any) => {
        const harga = Number(varian.harga) || 0;
        const diskon = Number(varian.diskon) || 0;
        const hargaDiskon = harga - (harga * diskon) / 100;

        const hargaDiskonBulat = Math.round(hargaDiskon / 1000) * 1000;

        await strapi.db.query("komponen-produk.varian-kemasan").update({
            where: { id: varian.id },
            data: {
                harga_diskon: String(hargaDiskonBulat),
                _skipDiscount: true
            },
        });
    });
    
    await Promise.all(updates);
}