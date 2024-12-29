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

const Zakat = () => {

    //meta title
    document.title = "LPD Zakat | Dashboard Finansial";


    // const { data, isLoading: loading } = useMutateDataMuzzaki()
    // const [isLoading, setLoading] = useState(loading)

    // const columns = useMemo(
    //     () => [
    //         {
    //             header: 'No',
    //             // accessorKey: "id",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //             cell: (cellProps) => {
    //                 return <Link to="#" className="text-body fw-bold">{cellProps.row.index + 1}</Link>
    //             }
    //         },
    //         {
    //             header: "Nama",
    //             accessorKey: "is_nologin",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //             cell: (cellProps) => {
    //                 const login = Number(cellProps.getValue());
    //                 if (login === 0) {
    //                     return <span>{cellProps.row.original.user.user_nama}</span>
    //                 } else if (login === 1) {
    //                     return <span>{cellProps.row.original.nama_muzaki}</span>
    //                 }
    //             },
    //         },
    //         {
    //             header: 'Email',
    //             accessorKey: "is_nologin",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //             cell: (cellProps) => {
    //                 const login = Number(cellProps.getValue());
    //                 if (login === 0) {
    //                     return <span>{cellProps.row.original.user.username}</span>
    //                 } else if (login === 1) {
    //                     return <span>{cellProps.row.original.email_muzaki}</span>
    //                 }
    //             },
    //         },
    //         {
    //             header: 'Phone',
    //             accessorKey: "is_nologin",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //             cell: (cellProps) => {
    //                 const login = Number(cellProps.getValue());
    //                 if (login === 0) {
    //                     return <span>{cellProps.row.original.user.user_phone}</span>
    //                 } else if (login === 1) {
    //                     return <span>{cellProps.row.original.phone_muzaki}</span>
    //                 }
    //             },
    //         },
    //         {
    //             header: 'Program',
    //             accessorKey: "program.program_title",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //         },
    //         {
    //             header: 'Tanggal Transfer',
    //             accessorKey: "trans_date",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //             cell: (cellProps) => {
    //                 const rawDate = cellProps.getValue();
    //                 if (!rawDate) {
    //                     return <span>-</span>;
    //                 }

    //                 const date = new Date(rawDate);
    //                 if (isNaN(date.getTime())) {
    //                     return <span>Invalid Date</span>;
    //                 }

    //                 const tgl = format(date, 'dd MMMM yyyy', { locale: id });
    //                 return <span>{tgl}</span>;
    //             }
    //         },
    //         {
    //             header: 'Payment Method',
    //             accessorKey: "payment_method",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //         },
    //         {
    //             header: 'Nominal',
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //             accessorKey: "amount",
    //             cell: (cellProps) => {
    //                 const nominal = Number(cellProps.getValue());
    //                 return <span className="">{numberFormat(nominal)}</span>;
    //             },
    //         },
    //         {
    //             header: 'Status',
    //             accessorKey: "status",
    //             enableColumnFilter: false,
    //             enableSorting: true,
    //             cell: (cellProps) => {
    //                 switch (cellProps.row.original.status) {
    //                     case "success":
    //                         return <Badge className="bg-success">Success</Badge>
    //                     case "pending":
    //                         return <Badge className="bg-info">Pending</Badge>
    //                     case "failed":
    //                         return <Badge className="bg-danger">Failed</Badge>
    //                 }
    //             }
    //         },
    //     ],
    //     []
    // );
    // const tableData = data?.data || [];

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="LPD Zakat" breadcrumbItem="Laporan Perubahan Dana Zakat" />
                    <Card>
                        <CardBody className="border-bottom">
                            <div className="d-flex align-items-center">
                                <h5 className="mb-0 card-title flex-grow-1">Dana Zakat</h5>
                            </div>
                        </CardBody>

                        {/* Dana Zakat */}
                        <CardBody>
                            {/* <div className="mb-2">
                                <h5 className="fw-bold">Dana Zakat</h5>
                                <p>Rincian penerimaan dana zakat adalah sebagai berikut:</p>
                            </div> */}

                            <div className="mb-0">
                                <p className="fw-bold">1. PENERIMAAN</p>
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
                                        <td className="col-6">Penerimaan dari Donatur</td>
                                        <td className="text-end col-3">6,005,664,314</td>
                                        <td className="text-end col-3">14,823,489,893</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Penerimaan Bagi Hasil Bank Syariah</td>
                                        <td className="text-end col-3">18,063,192</td>
                                        <td className="text-end col-3">24,185,603</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr className="fw-bold">
                                        <td className="col-6">Jumlah Penerimaan Dana Zakat</td>
                                        <td className="text-end col-3">6,910,127,553</td>
                                        <td className="text-end col-3">13,684,726,242</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mb-0">
                                <p className="fw-bold">2. PENYALURAN</p>
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
                                        <td className="col-6">Amil</td>
                                        <td className="text-end col-3">6,005,664,314</td>
                                        <td className="text-end col-3">14,823,489,893</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Fakir - Miskin</td>
                                        <td className="text-end col-3">18,063,192</td>
                                        <td className="text-end col-3">24,185,603</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Riqab</td>
                                        <td className="text-end col-3">6,005,664,314</td>
                                        <td className="text-end col-3">14,823,489,893</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Gharimin</td>
                                        <td className="text-end col-3">18,063,192</td>
                                        <td className="text-end col-3">24,185,603</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Muallaf</td>
                                        <td className="text-end col-3">6,005,664,314</td>
                                        <td className="text-end col-3">4,823,489,893</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Sabilillah</td>
                                        <td className="text-end col-3">8,063,192</td>
                                        <td className="text-end col-3">2,185,603</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Ibnu Sabil</td>
                                        <td className="text-end col-3">18,063,192</td>
                                        <td className="text-end col-3">4,185,603</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr className="fw-bold">
                                        <td className="col-6">Jumlah Penyaluran Dana Zakat</td>
                                        <td className="text-end col-3">6,910,127,553</td>
                                        <td className="text-end col-3">13,684,726,242</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>

                        <CardBody>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">2022</th>
                                        <th scope="col" className="text-end">2021</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="fw-bold">
                                        <td className="col-6">Surplus / (Defisit)</td>
                                        <td className="text-end col-3">(886,400,047)</td>
                                        <td className="text-end col-3">1,162,949,254</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Saldo Awal</td>
                                        <td className="text-end col-3">4,963,233,536</td>
                                        <td className="text-end col-3">3,043,664,930</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Penyesuaian Saldo Dana Zakat</td>
                                        <td className="text-end col-3">-</td>
                                        <td className="text-end col-3">756,619,352</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td className="col-6">Saldo Akhir</td>
                                        <td className="text-end col-3">4,076,833,489</td>
                                        <td className="text-end col-3">4,963,233,536</td>
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


export default Zakat;