// next.config.js

module.exports = global.config = {
    apiUrl: process.env.API_URL,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    i18n: {
        welcome: {
            en: "Welcome",
            fa: "خوش آمدید",
            id: "Selamat Datang"
        }
        // rest of your translation object
    },
    app: {
        title: 'GDPSApp',
        description: 'Anda pemakai Aplikasi Keuangan GKI Denpasar - Bali. Aplikasi ini membantu: Mencatat Transaksi, Pembukuan dan Membuat Laporan Posisi Keuangan.',
        version: '1.2.0',
        maxYearBack: 2, // Maximum years to go back, dari tahun sekarang
        periodStart: '2024-04-01', // 'YYYY-MM-DD' format - mulai 1 April 2024
    },
    msgText: {
        success: 'Berhasil!',
        fail: 'Gagal!',
        error: 'Ada Kesalahan',
        netErr: 'Koneksi Internet Bermasalah',
        noData: 'Tidak ada data',
        wait: 'Tunggu...',
        loading: 'Sedang memuat...',        
    },
    pageInfo: {
        headerText: 'GDPSApp',
        footerText: '© GDPS 2024',
        mText: "Bulanan",
        yText: "Tahunan",
        infoNeracaBalance: 'Neraca Seimbang',
        infoNeracaUnbalance: 'Neraca Belum Seimbang',
    },
    pageTitle: {
        home: 'Home',
        dashboard: 'Dashboard',
        coa: 'Daftar Akun',
        neraca: 'Neraca',
        lampNeraca: 'Lampiran Neraca',
        activity: 'AKTIVITAS & ARUS KAS',
        cashflow: 'PENERIMAAN/PENGELUARAN',
        ledger: 'Buku Besar',
        nerSaldo: 'Neraca Saldo',
        tjbj: 'TJBJ',
        closing: 'Penutupan Buku',
        

    },
    btnCaption: {
        hitung: 'HITUNG',
        tampilkan: 'TAMPILKAN',
    }
    // other global config variables you wish
};