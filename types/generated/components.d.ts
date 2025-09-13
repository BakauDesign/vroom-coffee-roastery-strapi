import type { Schema, Struct } from '@strapi/strapi';

export interface KomponenProdukFiturUtama extends Struct.ComponentSchema {
  collectionName: 'components_komponen_produk_fitur_utamas';
  info: {
    displayName: 'Fitur Utama';
    icon: 'dashboard';
  };
  attributes: {
    deskripsi: Schema.Attribute.Text & Schema.Attribute.Required;
    emoji: Schema.Attribute.String & Schema.Attribute.Required;
    nama: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface KomponenProdukProduk extends Struct.ComponentSchema {
  collectionName: 'components_komponen_produk_produks';
  info: {
    displayName: 'Produk';
    icon: 'dashboard';
  };
  attributes: {
    aktif: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    deskripsi: Schema.Attribute.Text & Schema.Attribute.Required;
    foto: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    highlight: Schema.Attribute.Text;
    highlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nama: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface KomponenProdukProdukYangDibeli extends Struct.ComponentSchema {
  collectionName: 'components_komponen_produk_produk_yang_dibelis';
  info: {
    displayName: 'Produk Yang Dibeli';
    icon: 'dashboard';
  };
  attributes: {
    kuantitas: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    nama_produk: Schema.Attribute.String & Schema.Attribute.Required;
    varian_berat: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    varian_harga: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    varian_kemasan: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface KomponenProdukRekomendasiPenyajian
  extends Struct.ComponentSchema {
  collectionName: 'components_komponen_produk_rekomendasi_penyajians';
  info: {
    displayName: 'Rekomendasi Penyajian';
    icon: 'dashboard';
  };
  attributes: {
    deskripsi: Schema.Attribute.Text & Schema.Attribute.Required;
    nama: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface KomponenProdukUlasan extends Struct.ComponentSchema {
  collectionName: 'components_komponen_produk_ulasans';
  info: {
    displayName: 'Ulasan';
    icon: 'dashboard';
  };
  attributes: {
    konten: Schema.Attribute.Text & Schema.Attribute.Required;
    lokasi: Schema.Attribute.String & Schema.Attribute.Required;
    nama: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    tampilkan: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface KomponenProdukVarianKemasan extends Struct.ComponentSchema {
  collectionName: 'components_komponen_produk_varian_kemasans';
  info: {
    displayName: 'Varian Kemasan';
    icon: 'dashboard';
  };
  attributes: {
    berat: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    diskon: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
        },
        number
      >;
    harga: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    harga_diskon: Schema.Attribute.BigInteger;
    kemasan: Schema.Attribute.String & Schema.Attribute.Required;
    stok: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'komponen-produk.fitur-utama': KomponenProdukFiturUtama;
      'komponen-produk.produk': KomponenProdukProduk;
      'komponen-produk.produk-yang-dibeli': KomponenProdukProdukYangDibeli;
      'komponen-produk.rekomendasi-penyajian': KomponenProdukRekomendasiPenyajian;
      'komponen-produk.ulasan': KomponenProdukUlasan;
      'komponen-produk.varian-kemasan': KomponenProdukVarianKemasan;
    }
  }
}
