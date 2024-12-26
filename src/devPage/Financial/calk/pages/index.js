import React, { useEffect, useMemo, useState } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../components/TableContainer';
import { numberFormat } from "lib/numberFormat";

//import components
import Breadcrumbs from '../../../../components/Common/Breadcrumb';

import {
    Col,
    Row,
    Card,
    CardBody,
    Badge,
} from "reactstrap";
import Spinners from "components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import useMutateDataMuzzaki from "../hooks/useMutateDataMuzzaki";

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const CALK = () => {

    //meta title
    document.title = "Muzzaki List | Dashboard Finansial";


    const { data, isLoading: loading } = useMutateDataMuzzaki()
    const [isLoading, setLoading] = useState(loading)

    const columns = useMemo(
        () => [
            {
                header: 'No',
                // accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    return <Link to="#" className="text-body fw-bold">{cellProps.row.index + 1}</Link>
                }
            },
            {
                header: "Nama",
                accessorKey: "is_nologin",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const login = Number(cellProps.getValue());
                    if (login === 0) {
                        return <span>{cellProps.row.original.user.user_nama}</span>
                    } else if (login === 1) {
                        return <span>{cellProps.row.original.nama_muzaki}</span>
                    }
                },
            },
            {
                header: 'Email',
                accessorKey: "is_nologin",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const login = Number(cellProps.getValue());
                    if (login === 0) {
                        return <span>{cellProps.row.original.user.username}</span>
                    } else if (login === 1) {
                        return <span>{cellProps.row.original.email_muzaki}</span>
                    }
                },
            },
            {
                header: 'Phone',
                accessorKey: "is_nologin",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const login = Number(cellProps.getValue());
                    if (login === 0) {
                        return <span>{cellProps.row.original.user.user_phone}</span>
                    } else if (login === 1) {
                        return <span>{cellProps.row.original.phone_muzaki}</span>
                    }
                },
            },
            {
                header: 'Program',
                accessorKey: "program.program_title",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Tanggal Transfer',
                accessorKey: "trans_date",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const rawDate = cellProps.getValue();
                    if (!rawDate) {
                        return <span>-</span>;
                    }

                    const date = new Date(rawDate);
                    if (isNaN(date.getTime())) {
                        return <span>Invalid Date</span>;
                    }

                    const tgl = format(date, 'dd MMMM yyyy', { locale: id });
                    return <span>{tgl}</span>;
                }
            },
            {
                header: 'Payment Method',
                accessorKey: "payment_method",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Nominal',
                enableColumnFilter: false,
                enableSorting: true,
                accessorKey: "amount",
                cell: (cellProps) => {
                    const nominal = Number(cellProps.getValue());
                    return <span className="">{numberFormat(nominal)}</span>;
                },
            },
            {
                header: 'Status',
                accessorKey: "status",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    switch (cellProps.row.original.status) {
                        case "success":
                            return <Badge className="bg-success">Success</Badge>
                        case "pending":
                            return <Badge className="bg-info">Pending</Badge>
                        case "failed":
                            return <Badge className="bg-danger">Failed</Badge>
                    }
                }
            },
        ],
        []
    );
    const tableData = data?.data || [];

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="CALK" breadcrumbItem="Catatan Atas Laporan Keuangan" />
                    <Card>
                        <CardBody className="border-bottom">
                            <div className="d-flex align-items-center">
                                <h5 className="mb-0 card-title flex-grow-1">Catatan Atas Laporan Keuangan</h5>
                            </div>
                        </CardBody>

                        {/* Kas dan Setara Kas  */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">1. Kas dan Setara Kas</h5>
                                <p>Rincian akun kas dan setaranya terdiri dari:</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Data Kas */}
                                    <tr>
                                        <td className="fw-bold">Kas</td>
                                    </tr>
                                    <tr>
                                        <td>Kas Kecil Zakat</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Kas Kecil Infak</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="text-end fw-bold">15,496,200</td>
                                        <td className="text-end fw-bold">15,496,200</td>
                                    </tr>
                                    {/* Data Bank */}
                                    <tr>
                                        <td className="fw-bold">Bank</td>
                                    </tr>
                                    {[
                                        { bank: "MANDIRI 103-00-9526589-4", val2022: "131,367,813", val2021: "127,005,441" },
                                        { bank: "MANDIRI 103-00-9526546-4", val2022: "347,530,420", val2021: "40,597,461" },
                                        { bank: "MANDIRI 103-00-0500055-5", val2022: "442,899,536", val2021: "376,284,876" },
                                        { bank: "BSM 7015.734.188", val2022: "98,123,456", val2021: "87,654,321" },
                                        { bank: "BSM 7015.738.876", val2022: "67,890,123", val2021: "56,789,012" },
                                        { bank: "BSM 7015.740.307", val2022: "45,678,901", val2021: "34,567,890" },
                                        { bank: "BSM 7015.742.644", val2022: "23,456,789", val2021: "12,345,678" },
                                        { bank: "BSM-8001516176", val2022: "11,223,344", val2021: "9,876,543" },
                                        { bank: "BSM 99999.1111.8", val2022: "8,765,432", val2021: "7,654,321" },
                                        { bank: "BSM 99999.3333.2", val2022: "6,543,210", val2021: "5,432,109" },
                                        { bank: "BSM 7100922503", val2022: "4,321,098", val2021: "3,210,987" },
                                        { bank: "BSM 9999987874", val2022: "2,109,876", val2021: "1,098,765" },
                                        { bank: "BSM 7771110171", val2022: "987,654", val2021: "876,543" },
                                        { bank: "BSM 7112454009", val2022: "765,432", val2021: "654,321" },
                                        { bank: "BSM 5551002006", val2022: "543,210", val2021: "432,109" },
                                        { bank: "BSM 3331002002", val2022: "321,098", val2021: "210,987" },
                                        { bank: "BSM 1111002009", val2022: "109,876", val2021: "98,765" },
                                    ].map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.bank}</td>
                                            <td className="text-end">{item.val2022}</td>
                                            <td className="text-end">{item.val2021}</td>
                                        </tr>
                                    ))}
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">5,698,569,135</td>
                                        <td className="text-end">6,503,427,769</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}></td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td>Jumlah Kas dan Setara Kas</td>
                                        <td className="text-end">5,714,065,335</td>
                                        <td className="text-end">6,518,923,969</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Piutang */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">2. Piutang</h5>
                                <p>Rincian piutang terdiri dari:</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Piutang Penyaluran Zakat Regional</td>
                                        <td className="text-end">433,909,626</td>
                                        <td className="text-end">433,909,626</td>
                                    </tr>
                                    <tr>
                                        <td>Piutang Qardhul Hasan</td>
                                        <td className="text-end">-</td>
                                        <td className="text-end">-</td>
                                    </tr>
                                    <tr>
                                        <td>Piutang Lain-lain</td>
                                        <td className="text-end">-</td>
                                        <td className="text-end">-</td>
                                    </tr>
                                    <tr>
                                        <td>Dana Kerja Sama Rumah Zakat</td>
                                        <td className="text-end">-</td>
                                        <td className="text-end">-</td>
                                    </tr>
                                    <tr>
                                        <td>Piutang Penyaluran Imkas</td>
                                        <td className="text-end">416,95,418</td>
                                        <td className="text-end">-</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td>Jumlah Piutang</td>
                                        <td className="text-end">475,605,044</td>
                                        <td className="text-end">433,909,626</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mb-0">
                                <p className="fw-bold">Catatan:</p>
                                <p>Piutang lain-lain adalah transaksi pinjaman yang diberikan oleh ZIS Indosat yang tidak dikategorikan sebagai piutang qardhul hasan.</p>
                                <p>Dana kerja sama Rumah Zakat adalah akun kontra sementara untuk mengakui masuk keluarnya payroll akibat dari adanya perjanjian dengan Rumah Zakat</p>
                            </div>
                        </CardBody>

                        {/* Aset Tetap */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">3. Aset Tetap</h5>
                                <p>Rincian aset tetap dan akumulasi penyusutannya adalah sebagai berikut:</p>
                            </div>

                            {/* Tabel Aset Tetap */}
                            <div className="space-y-6">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" rowSpan={2}></th>
                                            <th scope="col" className="text-center" colSpan={4}>2022</th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-end">Saldo Awal</th>
                                            <th scope="col" className="text-end">Penambahan</th>
                                            <th scope="col" className="text-end">Pengurangan</th>
                                            <th scope="col" className="text-end">Saldo Akhir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">Biaya Perolehan</td>
                                        </tr>
                                        <tr>
                                            <td>Alat Elektronik</td>
                                            <td className="text-end">92,456,500</td>
                                            <td className="text-end">-</td>
                                            <td className="text-end">-</td>
                                            <td className="text-end">92,456,500</td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah</td>
                                            <td className="text-end fw-bold">92,456,500</td>
                                            <td className="text-end fw-bold">-</td>
                                            <td className="text-end fw-bold">-</td>
                                            <td className="text-end fw-bold">92,456,500</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Akumulasi Penyusutan</td>
                                        </tr>
                                        <tr>
                                            <td>Alat Elektronik</td>
                                            <td className="text-end">(64,061,063)</td>
                                            <td className="text-end">(222,200)</td>
                                            <td className="text-end">-</td>
                                            <td className="text-end">(64,283,263)</td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah</td>
                                            <td className="text-end fw-bold">(64,061,063)</td>
                                            <td className="text-end fw-bold">(222,200)</td>
                                            <td className="text-end fw-bold">-</td>
                                            <td className="text-end fw-bold">(64,283,263)</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}></td>
                                        </tr>
                                        <tr>
                                            <td>Nilai Buku</td>
                                            <td colSpan={4} className="text-end fw-bold">28,173,237</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" rowSpan={2}></th>
                                            <th scope="col" className="text-center" colSpan={4}>2021</th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-end">Saldo Awal</th>
                                            <th scope="col" className="text-end">Penambahan</th>
                                            <th scope="col" className="text-end">Pengurangan</th>
                                            <th scope="col" className="text-end">Saldo Akhir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">Biaya Perolehan</td>
                                        </tr>
                                        <tr>
                                            <td>Alat Elektronik</td>
                                            <td className="text-end">61,042,500</td>
                                            <td className="text-end">31,414,000</td>
                                            <td className="text-end">-</td>
                                            <td className="text-end">92,456,500</td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah</td>
                                            <td className="text-end">61,042,500</td>
                                            <td className="text-end">31,414,000</td>
                                            <td className="text-end">-</td>
                                            <td className="text-end">92,456,500</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Akumulasi Penyusutan</td>
                                        </tr>
                                        <tr>
                                            <td>Alat Elektronik</td>
                                            <td className="text-end">(59,278,794)</td>
                                            <td className="text-end">(4,782,269)</td>
                                            <td className="text-end">-</td>
                                            <td className="text-end">(64,061,063)</td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah</td>
                                            <td className="text-end">(59,278,794)</td>
                                            <td className="text-end">(4,782,269)</td>
                                            <td className="text-end">-</td>
                                            <td className="text-end">(64,061,063)</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}></td>
                                        </tr>
                                        <tr>
                                            <td>Nilai Buku</td>
                                            <td colSpan={4} className="text-end fw-bold">28,395,437</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>

                        {/* Aset Kelolaan */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">4. Aset Kelolaan</h5>
                                <p>Saldo aset kelolaan Rp 0 setelah dilakukan pelepasan aset kelolaan di tahun 2019. Rincian aset kelolaan disajikan dalam Laporan Perubahan Aset Kelolaan.</p>
                            </div>
                        </CardBody>

                        {/* Titipan Dana Infak SMS */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">5. Titipan Dana Infak SMS</h5>
                                <p>Akun ini merupakan dana titipan dari Panitia Ramadhan Seksi Kerohanian Indosat yang melakukan penghimpunan dana infaq melalui SMS dengan meminjam rekening ZIS Indosat. Saldo akun ini adalah sebagai berikut:</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Titipan Dana Infak SMS</td>
                                        <td className="text-end fw-bold">252,398,066</td>
                                        <td className="text-end fw-bold">252,398,066</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Titipan Dana Non Halal */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">6. Titipan Dana Non Halal</h5>
                                <p>Titipan dana non halal merupakan saldo akhir dari penerimaan dan penyaluran dana non halal yang diperoleh dari pendapatan giro rekening bank konvensional yaitu Bank Mandiri # 103-00-9526589-4; Bank Mandiri # 103-00-9526546-4; dan Bank Mandiri # 103-00-0500055-5. Saldo akun ini adalah sebagai berikut:</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Titipan Dana Non Halal</td>
                                        <td className="text-end fw-bold">27,018,998</td>
                                        <td className="text-end fw-bold">28,188,926</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mb-0">
                                <p className="fw-bold">Catatan:</p>
                                <p>Penerimaan dan penyaluran dana non halal tidak disajikan dalam Laporan Perubahan Dana secara khusus.</p>
                            </div>
                        </CardBody>

                        {/* Titipan Dana Infak Masjid */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">7. Titipan Dana Infak Mesjid</h5>
                                <p>Akun ini merupakan titipan dana infak milik Mesjid Indosat yang dititipkan ke bank dengan atas nama ZIS Indosat. Rekening titipan tersebut ada di Bank BSM No. 7100922503.</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-end fw-bold">21,339,329</td>
                                        <td className="text-end fw-bold">19,339,329</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Titipan Dana Zakat */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">8. Titipan Dana Zakat</h5>
                                <p>Akun ini merupakan titipan dana sementara yang nantinya akan disalurkan langsung oleh ZIS Indosat</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-end fw-bold">26,041,350</td>
                                        <td className="text-end fw-bold">26,041,350</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Titipan Dana Infak/Sedekah */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">9. Titipan Dana Infak/Sedekah</h5>
                                <p>Akun ini merupakan titipan dana infak/sedekah dari penerimaan ke zis indosat</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-end fw-bold">224,312,221</td>
                                        <td className="text-end fw-bold">224,312,221</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Titipan Dana Wakaf */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">10. Titipan Dana Wakaf</h5>
                                <p>Akun ini merupakan titipan dana wakaf dari penerimaan wakaf ke zis indosat</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-end fw-bold">4,040,000</td>
                                        <td className="text-end fw-bold">4,040,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Wakaf Produktif */}
                        <CardBody className="border-bottom">
                            <div className="mb-0">
                                <h5 className="fw-bold">11. Wakaf Produktif</h5>
                                <p>Akun ini merupakan titipan dana wakaf produktif ke zis indosat yang penerimaannya bersumber dari rek. BSM 7771110171</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-end fw-bold">-</td>
                                        <td className="text-end fw-bold">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Penerimaan Dana Zakat */}
                        <CardBody className="border-bottom">
                            <div className="mb-2">
                                <h5 className="fw-bold">12. Penerimaan Dana Zakat</h5>
                                <p>Rincian penerimaan dana zakat adalah sebagai berikut:</p>
                            </div>

                            <div className="mb-0">
                                <p className="fw-bold">1. Penerimaan dari Donatur dan Bagi Hasil:</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Penerimaan Zakat Profesi Potong Gaji</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Zakat Profesi Tunai</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Zakat Hadiah</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Zakat Maal</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Zakat Fitrah</td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mb-0">
                                <p className="fw-bold">2. Penerimaan dari non Donatur:</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Penerimaan Bagi Hasil Bank Syariah</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Pengembalian Dana Bergulir Zakat</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Pengembalian Dana Program</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Lainnya</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr className="fw-bold">
                                        <td>Jumlah Penerimaan Dana Zakat</td>
                                        <td className="text-end">6,910,127,553</td>
                                        <td className="text-end">13,684,726,242</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Penyaluran Dana Zakat */}
                        <CardBody className="border-bottom">
                            <div className="mb-2">
                                <h5 className="fw-bold">13. Penyaluran Dana Zakat</h5>
                                <p>Rincian penyaluran dana zakat kepada mustahik adalah sebagai berikut:</p>
                            </div>
                            {/* bagian Amil atas zakat */}
                            <div className="mb-0">
                                <p className="fw-bold">1. Bagian Amil atas Dana Zakat</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Bagian Amil atas Dana Zakat</td>
                                        <td className="text-end">750,708,039.25</td>
                                        <td className="text-end">1,848,562,861.63</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Fakir Miskin */}
                            <div className="mb-0">
                                <p className="fw-bold">2. Fakir Miskin</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fw-semibold">Bantuan Biaya Hidup-Fakir Miskin</td>
                                    </tr>
                                    <tr>
                                        <td>Santunan Sembako</td>
                                        <td className="text-end">1,483,100,000</td>
                                        <td className="text-end">1,787,043,500</td>
                                    </tr>
                                    <tr>
                                        <td>Yatim Piatu Dhuafa</td>
                                        <td className="text-end">458,850,000</td>
                                        <td className="text-end">734,050,000</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Biaya Hidup Individu</td>
                                        <td className="text-end">-</td>
                                        <td className="text-end">5,000,000</td>
                                    </tr>
                                    <tr>
                                        <td>Zakat fitrah</td>
                                        <td className="text-end">6,935,500</td>
                                        <td className="text-end">4,690,000</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Bea-Guru</td>
                                        <td className="text-end">219,000,000</td>
                                        <td className="text-end">439,000,000</td>
                                    </tr>

                                    <tr>
                                        <td className="fw-semibold">Bantuan Pendidikan-Fakir Miskin</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Beasiswa Rutin</td>
                                        <td className="text-end">1,483,100,000</td>
                                        <td className="text-end">1,787,043,500</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Beasiswa Putus</td>
                                        <td className="text-end">458,850,000</td>
                                        <td className="text-end">734,050,000</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Buku & Perlengkapan Sekolah</td>
                                        <td className="text-end">-</td>
                                        <td className="text-end">5,000,000</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Prasarana Pendidikan</td>
                                        <td className="text-end">6,935,500</td>
                                        <td className="text-end">4,690,000</td>
                                    </tr>

                                    <tr>
                                        <td className="fw-semibold">Bantuan Kesehatan-Fakir Miskin</td>
                                    </tr>
                                    <tr>
                                        <td>Pengobatan Individu</td>
                                        <td className="text-end">1,483,100,000</td>
                                        <td className="text-end">1,787,043,500</td>
                                    </tr>
                                    <tr>
                                        <td>Baksos Kesehatan</td>
                                        <td className="text-end">458,850,000</td>
                                        <td className="text-end">734,050,000</td>
                                    </tr>
                                    <tr>
                                        <td>Klinik (Pusesling Gratis)</td>
                                        <td className="text-end">-</td>
                                        <td className="text-end">5,000,000</td>
                                    </tr>

                                    <tr>
                                        <td className="fw-semibold">Bantuan Pemberdayaan Ekonomi-Fakir Miskin</td>
                                    </tr>
                                    <tr>
                                        <td>Pembinaan Ekonomi Lemah</td>
                                        <td className="text-end">1,483,100,000</td>
                                        <td className="text-end">1,787,043,500</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Modal Usaha</td>
                                        <td className="text-end">458,850,000</td>
                                        <td className="text-end">734,050,000</td>
                                    </tr>

                                    <tr>
                                        <td className="fw-semibold">Bantuan Emergency</td>
                                    </tr>
                                    <tr>
                                        <td>Recovery dan Rehabilitasi Daerah Kumuh/Tertinggal</td>
                                        <td className="text-end">1,483,100,000</td>
                                        <td className="text-end">1,787,043,500</td>
                                    </tr>
                                    <tr>
                                        <td>Rescue Bencana - Konflik</td>
                                        <td className="text-end">458,850,000</td>
                                        <td className="text-end">734,050,000</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Recovery Bencana</td>
                                        <td className="text-end">-</td>
                                        <td className="text-end">5,000,000</td>
                                    </tr>
                                    <tr>
                                        <td>Zakat Fakir Miskin Regional</td>
                                        <td className="text-end">6,935,500</td>
                                        <td className="text-end">4,690,000</td>
                                    </tr>

                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">4,615,283,142</td>
                                        <td className="text-end">9,017,457,974</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Gharimin */}
                            <div className="mb-0">
                                <p className="fw-bold">3. Gharimin</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gharimin</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Zakat Gharimin Regional</td>
                                        <td className="text-end">2,370,661</td>
                                        <td className="text-end">5,893,466</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">19,370,661</td>
                                        <td className="text-end">37,203,466</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Mualaf */}
                            <div className="mb-0">
                                <p className="fw-bold">4. Muallaf</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Muallaf</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Zakat Muallaf Regional</td>
                                        <td className="text-end">2,370,661</td>
                                        <td className="text-end">5,893,466</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">19,370,661</td>
                                        <td className="text-end">37,203,466</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Fisabilillah */}
                            <div className="mb-0">
                                <p className="fw-bold">5. Fisabilillah</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Kafalah Da'i</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Pelatihan Da'i</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Pembinaan Umat (Dakwah)</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Prasarana Dakwah</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Sarpras Pendidikan</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan untuk Palestina</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Zakat Fisabilillah Regional</td>
                                        <td className="text-end">2,370,661</td>
                                        <td className="text-end">5,893,466</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">19,370,661</td>
                                        <td className="text-end">37,203,466</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Ibnu Sabil */}
                            <div className="mb-0">
                                <p className="fw-bold">6. Ibnu Sabil</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ibnu Sabil</td>
                                        <td className="text-end">17,000,000</td>
                                        <td className="text-end">31,310,000</td>
                                    </tr>
                                    <tr>
                                        <td>Zakat Ibnu Sabil Regional</td>
                                        <td className="text-end">2,370,661</td>
                                        <td className="text-end">5,893,466</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">19,370,661</td>
                                        <td className="text-end">37,203,466</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Jumlah Penyaluran Dana Zakat */}
                            <table className="table table-bordered">
                                <tbody>
                                    <tr className="fw-bold">
                                        <td>Jumlah Penyaluran Dana Zakat</td>
                                        <td className="text-end">6,910,127,553</td>
                                        <td className="text-end">13,684,726,242</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Penerimaan Dana Infak/Sedekah */}
                        <CardBody className="border-bottom">
                            <div className="mb-2">
                                <h5 className="fw-bold">14. Penerimaan Dana Infak/Sedekah</h5>
                                <p>Rincian penerimaan dana infak/sedekah adalah sebagai berikut:</p>
                            </div>

                            <div className="mb-0">
                                <p className="fw-bold">1. Penerimaan Infak Terikat-Donatur</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Penerimaan Infak untuk Palestina</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Infak Program Khusus</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mb-0">
                                <p className="fw-bold">2. Penerimaan Infak Tidak Terikat-Donatur</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Peneriman Infak Jumat</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Infak Potong Gaji</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Kotak Infak</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Infak Ceramah Umum</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Infak Ramadhan</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Infak/Sedekah Umum</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Infak 1000 Quran</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Fidyah</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mb-0">
                                <p className="fw-bold">3. Penerimaan Infak Tidak Terikat - non Donatur</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Pendapatan Bagi Hasil Bank Syariah</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Pengembalian Dana Bergulir</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Pengembalian Dana Program</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr className="fw-bold">
                                        <td>Jumlah Penerimaan Dana Infak</td>
                                        <td className="text-end">6,910,127,553</td>
                                        <td className="text-end">13,684,726,242</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Penyaluran Dana Infak/Sedekah */}
                        <CardBody className="border-bottom">
                            <div className="mb-2">
                                <h5 className="fw-bold">15. Penyaluran Dana Infak/Sedekah</h5>
                                <p>Rincian penyaluran dana infak dan sedekah adalah sebagai berikut:</p>
                            </div>

                            <div className="mb-0">
                                <p className="fw-bold">1. Penyaluran Infak Terikat</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Bantuan Dana Kemanusiaan Palestina</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Penyaluran Dana Qurban</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Program Khusus</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Bantuan Rescue</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mb-0">
                                <p className="fw-bold">2. Penyaluran Infak Tidak Terikat</p>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Program Pendidikan</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Program Dakwah</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Program Kesehatan</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Program Sosial</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Penyaluran Amil</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Alokasi Pemanfaatan Aset Kelolaan</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr className="fw-bold">
                                        <td>Jumlah Penyaluran Dana Infak</td>
                                        <td className="text-end">6,910,127,553</td>
                                        <td className="text-end">13,684,726,242</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Penerimaan Dana Amil */}
                        <CardBody className="border-bottom">
                            <div className="mb-2">
                                <h5 className="fw-bold">16. Penerimaan Dana Amil</h5>
                                <p>Sumber penerimaan dana amil adalah sebagai berikut:</p>
                            </div>

                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Bagian Amil atas Dana Zakat</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Bagian Amil atas Dana Infak</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Penerimaan Amil Lainnya</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        {/* Penggunaan Dana Amil */}
                        <CardBody className="border-bottom">
                            <div className="mb-2">
                                <h5 className="fw-bold">17. Penggunaan Dana Amil</h5>
                                <p>Rincian akun ini terdiri dari:</p>
                            </div>

                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gaji Amil</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Pengembangan SDM</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Beban Amil Cabang</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Bank</td>
                                        <td className="text-end">13,399,700</td>
                                        <td className="text-end">13,399,700</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Alat Tulis Kantor</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Prasarana Sekretariat</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Pengembangan Aplikasi</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Pelayanan Muzakki</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Penyusutan Aktiva Tetap</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Sosialisasi ZIS</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Lain-Lain</td>
                                        <td className="text-end">2,096,500</td>
                                        <td className="text-end">2,096,500</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td className="text-end">15,496,200</td>
                                        <td className="text-end">15,496,200</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <ToastContainer />
        </React.Fragment >
    );
}


export default CALK;