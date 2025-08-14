import React, { useEffect, useMemo, useState } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../components/TableContainer';
import { numberFormat } from "lib/numberFormat";

//import components
import Breadcrumbs from '../../../../components/Common/Breadcrumb';
import useMutateDataCalk from "../hooks/useMutateDataCalk"
import { Col, Row, Card, CardBody, Badge } from "reactstrap"
import Spinners from "components/Common/Spinner"
import { ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"
import useMutateDataMuzzaki from "../hooks/useMutateDataMuzzaki"

import { format } from "date-fns"
import { id } from "date-fns/locale"

const month = [
  {
    name: "Januari",
    value: "01",
  },
  {
    name: "Februari",
    value: "02",
  },
  {
    name: "Maret",
    value: "03",
  },
  {
    name: "April",
    value: "04",
  },
  {
    name: "Mei",
    value: "05",
  },
  {
    name: "Juni",
    value: "06",
  },
  {
    name: "Juli",
    value: "07",
  },
  {
    name: "Agustus",
    value: "08",
  },
  {
    name: "September",
    value: "09",
  },
  {
    name: "Oktober",
    value: "10",
  },
  {
    name: "November",
    value: "11",
  },
  {
    name: "Desember",
    value: "12",
  },
]

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const Infak = () => {
  //meta title
  document.title = "LPD Infak | Dashboard Finansial"
  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3]
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState("01")
  const { data, isLoading: loading } = useMutateDataCalk(
    selectedMonth || selectedYear
      ? { month: selectedMonth, year: selectedYear }
      : {}
  )

  const dataQuery = data || []
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
          <Breadcrumbs
            title="LPD Infak"
            breadcrumbItem="Laporan Perubahan Dana Infak"
          />
          <Card>
            <CardBody className="border-bottom">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 card-title flex-grow-1">
                  Dana Infak/Sedekah
                </h5>
                <select
                  className="form-select w-auto mx-3"
                  value={selectedYear}
                  onChange={e => setSelectedYear(Number(e.target.value))}
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select w-auto"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                >
                  <option value="">Pilih Bulan</option>
                  {month.map(m => (
                    <option key={m.value} value={m.value}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardBody>

            {/* Dana Infak/Sedekah */}
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
                    <th scope="col" className="text-end">
                      {
                        [
                          "Januari",
                          "Februari",
                          "Maret",
                          "April",
                          "Mei",
                          "Juni",
                          "Juli",
                          "Agustus",
                          "September",
                          "Oktober",
                          "November",
                          "Desember",
                        ][parseInt(selectedMonth, 10) - 1]
                      }{" "}
                      {selectedYear - 1}
                    </th>
                    <th scope="col" className="text-end">
                      {
                        [
                          "Januari",
                          "Februari",
                          "Maret",
                          "April",
                          "Mei",
                          "Juni",
                          "Juli",
                          "Agustus",
                          "September",
                          "Oktober",
                          "November",
                          "Desember",
                        ][parseInt(selectedMonth, 10) - 1]
                      }{" "}
                      {selectedYear}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-6">Penerimaan Infak/Sedekah Terikat</td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTerikatDonatur || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTerikatDonatur || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-6">
                      Penerimaan Infak/Sedekah Tidak Terikat
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanInfakNonDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.totalInfakTidakTerikatDonatur || 0)
                          )
                        : 0}
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanInfakNonDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.totalInfakTidakTerikatDonatur || 0)
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-bordered">
                <tbody>
                  <tr className="fw-bold">
                    <td className="col-6">
                      Jumlah Penerimaaan Dana Infak/Sedekah (Sebelum Bagi Hasil)
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTerikatDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.totalPenerimaanInfakNonDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.totalInfakTidakTerikatDonatur || 0)
                          )
                        : 0}
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTerikatDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.totalPenerimaanInfakNonDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.totalInfakTidakTerikatDonatur || 0)
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="text-end">
                      {
                        [
                          "Januari",
                          "Februari",
                          "Maret",
                          "April",
                          "Mei",
                          "Juni",
                          "Juli",
                          "Agustus",
                          "September",
                          "Oktober",
                          "November",
                          "Desember",
                        ][parseInt(selectedMonth, 10) - 1]
                      }{" "}
                      {selectedYear - 1}
                    </th>
                    <th scope="col" className="text-end">
                      {
                        [
                          "Januari",
                          "Februari",
                          "Maret",
                          "April",
                          "Mei",
                          "Juni",
                          "Juli",
                          "Agustus",
                          "September",
                          "Oktober",
                          "November",
                          "Desember",
                        ][parseInt(selectedMonth, 10) - 1]
                      }{" "}
                      {selectedYear}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-6">Penyaluran Infak/Sedekah Terikat</td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranInfakTerikat || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranInfakTerikat || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-6">
                      Penyaluran Infak/Sedekah Tidak Terikat
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranInfakTidakTerikat || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranInfakTidakTerikat || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-bordered">
                <tbody>
                  <tr className="fw-bold">
                    <td className="col-6">
                      Jumlah Penyaluran Dana Infak/Sedekah
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranInfakTerikat || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.totalPenyaluranInfakTidakTerikat || 0)
                          )
                        : 0}
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranInfakTerikat || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.totalPenyaluranInfakTidakTerikat || 0)
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            <CardBody>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-end">
                      {
                        [
                          "Januari",
                          "Februari",
                          "Maret",
                          "April",
                          "Mei",
                          "Juni",
                          "Juli",
                          "Agustus",
                          "September",
                          "Oktober",
                          "November",
                          "Desember",
                        ][parseInt(selectedMonth, 10) - 1]
                      }{" "}
                      {selectedYear - 1}
                    </th>
                    <th scope="col" className="text-end">
                      {
                        [
                          "Januari",
                          "Februari",
                          "Maret",
                          "April",
                          "Mei",
                          "Juni",
                          "Juli",
                          "Agustus",
                          "September",
                          "Oktober",
                          "November",
                          "Desember",
                        ][parseInt(selectedMonth, 10) - 1]
                      }{" "}
                      {selectedYear}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="fw-bold">
                    <td className="col-6">Surplus / (Defisit)</td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTerikatDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.totalPenerimaanInfakNonDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.totalInfakTidakTerikatDonatur || 0) -
                              ((dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.totalPenyaluranInfakTerikat || 0) +
                                (dataQuery.summaryPerPeriod.filter(
                                  val =>
                                    val.year === selectedYear - 1 &&
                                    val.period === selectedMonth
                                )[0]?.totalPenyaluranInfakTidakTerikat || 0))
                          )
                        : 0}
                    </td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            (dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTerikatDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.totalPenerimaanInfakNonDonatur || 0) +
                              (dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.totalInfakTidakTerikatDonatur || 0) -
                              ((dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.totalPenyaluranInfakTerikat || 0) +
                                (dataQuery.summaryPerPeriod.filter(
                                  val =>
                                    val.year === selectedYear &&
                                    val.period === selectedMonth
                                )[0]?.totalPenyaluranInfakTidakTerikat || 0))
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-6">Saldo Awal</td>
                    <td className="text-end col-3">4,963,233,536</td>
                    <td className="text-end col-3">3,043,664,930</td>
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
    </React.Fragment>
  )
}


export default Infak;