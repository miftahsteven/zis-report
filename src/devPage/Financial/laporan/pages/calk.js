import React, { useEffect, useState } from "react"
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

//import components
import Breadcrumbs from "../../../../components/Common/Breadcrumb"

import { ToastContainer } from "react-toastify"
import { Card, CardBody, Col } from "reactstrap"
import useMutateDataBank from "../hooks/useMutateDataBank"
import useMutateDataCalk from "../hooks/useMutateDataCalk"
import useMutateDataKas from "../hooks/useMutateDataKas"

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

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <React.Fragment>
      <Col sm={4}>
        <input
          {...props}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Col>
    </React.Fragment>
  )
}

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const CALK = () => {
  //meta title
  document.title = "CALK | Dashboard Finansial"
  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3]
  const [selectedMonth, setSelectedMonth] = useState("01")
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [globalFilter, setGlobalFilter] = useState("")
  const { data, isLoading: loading } = useMutateDataCalk(
    selectedMonth || selectedYear
      ? { month: selectedMonth, year: selectedYear }
      : {}
  )
  console.log("data calk", data)
  const { data: dataEb, isLoading: loadingEb } = useMutateDataKas(
    selectedMonth || selectedYear
      ? { month: selectedMonth, year: selectedYear }
      : {}
  )
  const { data: dataBank, isLoading: loadingBank } = useMutateDataBank(
    selectedMonth || selectedYear
      ? { month: selectedMonth, year: selectedYear }
      : {}
  )

  const [isLoading, setLoading] = useState(loading)

  //console.log("--->",data.filter(val => val.name === "Santunan Sembako"));
  //console.log(data.data.filter(val => val.name == "Santunan Sembako"));

  const dataQuery = data || []
  const dataKasKecil = dataEb || {} // Pastikan dataKas selalu berupa objek, bukan array
  const dataKas = dataBank?.data || []
  console.log("data kas bank", dataKasKecil)

  console.log("Data terakhir:", dataKas?.data?.at(-1))
  // console.log("data Jasss", dataKas)

  const highlightWords = keyword => {
    const headings = document.querySelectorAll("h5")
    let firstMatchFound = false

    headings.forEach(heading => {
      const text = heading.textContent

      // Hapus sorotan sebelumnya
      heading.innerHTML = text

      if (keyword.trim() === "") return

      // Sorot teks yang cocok
      const regex = new RegExp(`(${keyword})`, "gi")
      const highlightedText = text.replace(
        regex,
        '<span class="bg-light">$1</span>'
      )

      heading.innerHTML = highlightedText

      // Scroll ke elemen yang pertama kali cocok
      if (!firstMatchFound && regex.test(text)) {
        firstMatchFound = true
        heading.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    })
  }

  useEffect(() => {
    if (document.getElementById("content")) {
      highlightWords(globalFilter)
    }
  }, [globalFilter])

  return (
    <React.Fragment>
      <div id="content" className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="CALK"
            breadcrumbItem="Catatan Atas Laporan Keuangan"
          />
          <Card>
            <CardBody className="border-bottom">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 card-title flex-grow-1">
                  Catatan Atas Laporan Keuangan
                </h5>
                <DebouncedInput
                  value={globalFilter ?? ""}
                  onChange={value => setGlobalFilter(String(value))}
                  className="form-control search-box me-2 mb-2 d-inline-block"
                  placeholder={"Cari..."}
                />
              </div>
            </CardBody>

            {/* Kas dan Setara Kas  */}
            <CardBody className="border-bottom">
              <div className="d-flex justify-content-between align-items-center mb-0">
                <h5 className="fw-bold">1. Kas dan Setara Kas</h5>
                <div className="d-flex justify-center items-center space-x-2">
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
              </div>
              <p>Rincian akun kas dan setaranya terdiri dari:</p>

              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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

                    <th scope="col" className="text-end col-3">
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
                  {/* Data Kas */}
                  <tr>
                    <td className="fw-bold">Kas</td>
                  </tr>
                  <tr>
                    <td>Kas Kecil Zakat</td>
                    <td className="text-end">
                      {dataKasKecil?.[`saldo_${selectedYear - 1}`]?.saldo_akhir
                        ? numberWithCommas(
                            dataKasKecil[`saldo_${selectedYear - 1}`]
                              .saldo_akhir
                          )
                        : 0}
                    </td>

                    <td className="text-end">
                      {" "}
                      <td className="text-end">
                        {dataKasKecil?.[`saldo_${selectedYear}`]?.saldo_akhir
                          ? numberWithCommas(
                              dataKasKecil[`saldo_${selectedYear}`].saldo_akhir
                            )
                          : 0}
                      </td>
                    </td>
                  </tr>

                  <tr>
                    <td></td>

                    {/* <td className="text-end fw-bold">15,496,200</td> */}
                  </tr>
                  {/* Data Bank */}
                  <tr>
                    <td className="fw-bold">Bank</td>
                  </tr>
                  {[
                    {
                      bank: "MANDIRI 1030095265894",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1030095265894" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1030095265894" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "MANDIRI 1030095265464",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1030095265464" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1030095265464" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "MANDIRI 1030005000555",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1030005000555" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1030005000555" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 7015734188",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015734188" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015734188" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 7015738876",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015738876" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015738876" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 7015740307",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015740307" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015740307" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 7015742644",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015742644" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7015742644" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 8001516176",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "8001516176" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "8001516176" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 9999911118",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "9999911118" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "9999911118" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },
                    {
                      bank: "BSM 9999933332",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "9999933332" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "9999933332" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 7100922503",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7100922503" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7100922503" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 9999987874",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "9999987874" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "9999987874" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 7771110171",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7771110171" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7771110171" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 7112454009",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7112454009" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "7112454009" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 5551002006",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "5551002006" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "5551002006" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 3331002002",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "3331002002" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "3331002002" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },

                    {
                      bank: "BSM 1111002009",
                      val2024:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1111002009" &&
                                  val.year === selectedYear - 1
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                      val2021:
                        dataKas.length > 0
                          ? Number(
                              dataKas.filter(
                                val =>
                                  val.account_number === "1111002009" &&
                                  val.year === selectedYear
                              )[0]?.eb_amount || 0
                            ).toLocaleString("id-ID")
                          : "0",
                    },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td>{item.bank}</td>
                      <td className="text-end">{item.val2024}</td>
                      <td className="text-end">{item.val2021}</td>
                    </tr>
                  ))}
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {dataKas.length > 0
                        ? numberWithCommas(
                            dataKas.find(
                              item => item[`total_bank_${selectedYear - 1}`]
                            )?.[ // Dinamis berdasarkan selectedYear - 1
                              `total_bank_${selectedYear - 1}`
                            ] || 0
                          )
                        : 0}
                    </td>

                    <td className="text-end">
                      {" "}
                      {dataKas.length > 0
                        ? numberWithCommas(
                            dataKas.find(
                              item => item[`total_bank_${selectedYear}`]
                            )?.[ // Dinamis berdasarkan selectedYear - 1
                              `total_bank_${selectedYear}`
                            ] || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}></td>
                  </tr>
                  <tr className="fw-bold">
                    <td>Jumlah Kas dan Setara Kas</td>
                    <td className="text-end">
                      {numberWithCommas(
                        (dataKasKecil?.[`saldo_${selectedYear - 1}`]
                          ?.saldo_akhir
                          ? Number(
                              dataKasKecil[`saldo_${selectedYear - 1}`]
                                .saldo_akhir
                            )
                          : 0) +
                          (dataKas.length > 0
                            ? Number(
                                dataKas.find(
                                  item => item[`total_bank_${selectedYear - 1}`]
                                )?.[`total_bank_${selectedYear - 1}`] || 0
                              )
                            : 0)
                      )}
                    </td>
                    <td className="text-end">
                      {numberWithCommas(
                        (dataKasKecil?.[`saldo_${selectedYear}`]
                          ?.saldo_akhir
                          ? Number(
                              dataKasKecil[`saldo_${selectedYear}`]
                                .saldo_akhir
                            )
                          : 0) +
                          (dataKas.length > 0
                            ? Number(
                                dataKas.find(
                                  item => item[`total_bank_${selectedYear}`]
                                )?.[`total_bank_${selectedYear}`] || 0
                              )
                            : 0)
                      )}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Piutang Penyaluran Zakat Regional</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 189 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 189 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Piutang Qardhul Hasan</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 190 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 190 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Piutang Lain-lain</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 191 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 191 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Dana Kerja Sama Rumah Zakat</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 192 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 192 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Piutang Penyaluran Imkas</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 193 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 193 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td>Jumlah Piutang</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalEndingBalancePiutang || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalEndingBalancePiutang || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mb-0">
                <p className="fw-bold">Catatan:</p>
                <p>
                  Piutang lain-lain adalah transaksi pinjaman yang diberikan
                  oleh ZIS Indosat yang tidak dikategorikan sebagai piutang
                  qardhul hasan.
                </p>
                <p>
                  Dana kerja sama Rumah Zakat adalah akun kontra sementara untuk
                  mengakui masuk keluarnya payroll akibat dari adanya perjanjian
                  dengan Rumah Zakat
                </p>
              </div>
            </CardBody>

            {/* Aset Tetap */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">3. Aset Tetap</h5>
                <p>
                  Rincian aset tetap dan akumulasi penyusutannya adalah sebagai
                  berikut:
                </p>
              </div>

              {/* Tabel Aset Tetap */}
              <div className="space-y-6">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" rowSpan={2} className="col-4"></th>
                      <th scope="col" className="text-center col-8" colSpan={4}>
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
                    </tr>
                    <tr>
                      <th scope="col" className="text-end col-2">
                        Saldo Awal
                      </th>
                      <th scope="col" className="text-end col-2">
                        Penambahan
                      </th>
                      <th scope="col" className="text-end col-2">
                        Pengurangan
                      </th>
                      <th scope="col" className="text-end col-2">
                        Saldo Akhir
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Biaya Perolehan</td>
                    </tr>
                    <tr>
                      <td>Alat Elektronik</td>
                      <td className="text-end">
                        {" "}
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 194 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end">-</td>
                      <td className="text-end">-</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 194 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td>Jumlah</td>
                      <td className="text-end fw-bold">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 194 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end fw-bold">-</td>
                      <td className="text-end fw-bold">-</td>
                      <td className="text-end fw-bold">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 194 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Akumulasi Penyusutan</td>
                    </tr>
                    <tr>
                      <td>Alat Elektronik</td>
                      <td className="text-end">
                        {" "}
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end">0</td>
                      <td className="text-end">-</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td>Jumlah</td>
                      <td className="text-end fw-bold">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end fw-bold">0</td>
                      <td className="text-end fw-bold">-</td>
                      <td className="text-end fw-bold">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear - 1
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td>Nilai Buku</td>
                      <td colSpan={4} className="text-end fw-bold">
                        {Array.isArray(dataQuery.summaryPerPeriod) &&
                        dataQuery.summaryPerPeriod.length > 0
                          ? numberWithCommas(
                              dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear - 1 &&
                                  val.period === selectedMonth
                              )[0]?.nilaiBuku || 0
                            )
                          : 0}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="col-4" rowSpan={2}></th>

                      <th scope="col" className="text-center col-8" colSpan={4}>
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
                    <tr>
                      <th scope="col" className="text-end col-2">
                        Saldo Awal
                      </th>
                      <th scope="col" className="text-end col-2">
                        Penambahan
                      </th>
                      <th scope="col" className="text-end col-2">
                        Pengurangan
                      </th>
                      <th scope="col" className="text-end col-2">
                        Saldo Akhir
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Biaya Perolehan</td>
                    </tr>
                    <tr>
                      <td>Alat Elektronik</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 194 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end">0</td>
                      <td className="text-end">-</td>
                      <td className="text-end">
                        {" "}
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 194 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td>Jumlah</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 194 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end">0</td>
                      <td className="text-end">-</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Akumulasi Penyusutan</td>
                    </tr>
                    <tr>
                      <td>Alat Elektronik</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end">0</td>
                      <td className="text-end">-</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td>Jumlah</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                      <td className="text-end">0</td>
                      <td className="text-end">-</td>
                      <td className="text-end">
                        {Array.isArray(dataQuery.data) &&
                        dataQuery.data.length > 0
                          ? numberWithCommas(
                              dataQuery.data.filter(
                                val =>
                                  val.gla_id === 195 &&
                                  val.period === selectedMonth &&
                                  val.year === selectedYear
                              )[0]?.ending_balance || 0
                            )
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}></td>
                    </tr>
                    <tr>
                      <td>Nilai Buku</td>
                      <td colSpan={4} className="text-end fw-bold">
                        {Array.isArray(dataQuery.summaryPerPeriod) &&
                        dataQuery.summaryPerPeriod.length > 0
                          ? numberWithCommas(
                              dataQuery.summaryPerPeriod.filter(
                                val =>
                                  val.year === selectedYear &&
                                  val.period === selectedMonth
                              )[0]?.nilaiBuku || 0
                            )
                          : 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>

            {/* Aset Kelolaan */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">4. Aset Kelolaan</h5>
                <p>
                  Saldo aset kelolaan Rp 0 setelah dilakukan pelepasan aset
                  kelolaan di tahun 2019. Rincian aset kelolaan disajikan dalam
                  Laporan Perubahan Aset Kelolaan.
                </p>
              </div>
            </CardBody>

            {/* Titipan Dana Infak SMS */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">5. Titipan Dana Infak SMS</h5>
                <p>
                  Akun ini merupakan dana titipan dari Panitia Ramadhan Seksi
                  Kerohanian Indosat yang melakukan penghimpunan dana infaq
                  melalui SMS dengan meminjam rekening ZIS Indosat. Saldo akun
                  ini adalah sebagai berikut:
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Titipan Dana Infak SMS</td>
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 365 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 365 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Titipan Dana Non Halal */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">6. Titipan Dana Non Halal</h5>
                <p>
                  Titipan dana non halal merupakan saldo akhir dari penerimaan
                  dan penyaluran dana non halal yang diperoleh dari pendapatan
                  giro rekening bank konvensional yaitu Bank Mandiri #
                  103-00-9526589-4; Bank Mandiri # 103-00-9526546-4; dan Bank
                  Mandiri # 103-00-0500055-5. Saldo akun ini adalah sebagai
                  berikut:
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Titipan Dana Non Halal</td>
                    <td className="text-end fw-bold">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 56 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 56 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mb-0">
                <p className="fw-bold">Catatan:</p>
                <p>
                  Penerimaan dan penyaluran dana non halal tidak disajikan dalam
                  Laporan Perubahan Dana secara khusus.
                </p>
              </div>
            </CardBody>

            {/* Titipan Dana Infak Masjid */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">7. Titipan Dana Infak Mesjid</h5>
                <p>
                  Akun ini merupakan titipan dana infak milik Mesjid Indosat
                  yang dititipkan ke bank dengan atas nama ZIS Indosat. Rekening
                  titipan tersebut ada di Bank BSM No. 7100922503.
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-end col-6">
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
                    <th scope="col" className="text-end col-6">
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
                    <td className="text-end fw-bold">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 240 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end fw-bold">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 240 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Titipan Dana Zakat */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">8. Titipan Dana Zakat</h5>
                <p>
                  Akun ini merupakan titipan dana sementara yang nantinya akan
                  disalurkan langsung oleh ZIS Indosat
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-end col-6">
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
                    <th scope="col" className="text-end col-6">
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
                    <td className="text-end fw-bold">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 241 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end fw-bold">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 241 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Titipan Dana Infak/Sedekah */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">9. Titipan Dana Infak/Sedekah</h5>
                <p>
                  Akun ini merupakan titipan dana infak/sedekah dari penerimaan
                  ke zis indosat
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-end col-6">
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
                    <th scope="col" className="text-end col-6">
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
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 242 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 242 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Titipan Dana Wakaf */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">10. Titipan Dana Wakaf</h5>
                <p>
                  Akun ini merupakan titipan dana wakaf dari penerimaan wakaf ke
                  zis indosat
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-end col-6">
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
                    <th scope="col" className="text-end col-6">
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
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 243 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 243 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Wakaf Produktif */}
            <CardBody className="border-bottom">
              <div className="mb-0">
                <h5 className="fw-bold">11. Wakaf Produktif</h5>
                <p>
                  Akun ini merupakan titipan dana wakaf produktif ke zis indosat
                  yang penerimaannya bersumber dari rek. BSM 7771110171
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-end col-6">
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
                    <th scope="col" className="text-end col-6">
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
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 244 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end fw-bold">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 244 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
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
                <p className="fw-bold">
                  1. Penerimaan dari Donatur dan Bagi Hasil:
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Penerimaan Zakat Profesi Potong Gaji</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 196 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 196 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Zakat Profesi Tunai</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 197 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 197 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Zakat Hadiah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 198 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 198 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Zakat Maal</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 199 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 199 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Zakat Fitrah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 200 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 200 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanDanaZakat || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanDanaZakat || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mb-0">
                <p className="fw-bold">2. Penerimaan dari non Donatur:</p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Penerimaan Bagi Hasil Bank Syariah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 201 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 201 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Pengembalian Dana Bergulir Zakat</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 202 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 202 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Pengembalian Dana Program</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 203 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 203 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Lainnya</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 204 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 204 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanDanaZakatNonDonatur || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanDanaZakatNonDonatur || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-bordered">
                <tbody>
                  <tr className="fw-bold">
                    <td className="col-6">Jumlah Penerimaan Dana Zakat</td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanZakat || 0
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
                            )[0]?.totalPenerimaanZakat || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Penyaluran Dana Zakat */}
            <CardBody className="border-bottom">
              <div className="mb-2">
                <h5 className="fw-bold">13. Penyaluran Dana Zakat</h5>
                <p>
                  Rincian penyaluran dana zakat kepada mustahik adalah sebagai
                  berikut:
                </p>
              </div>
              {/* bagian Amil atas zakat */}
              <div className="mb-0">
                <p className="fw-bold">1. Bagian Amil atas Dana Zakat</p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Bagian Amil atas Dana Zakat</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 219 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 219 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td className="fw-semibold">
                      Bantuan Biaya Hidup-Fakir Miskin
                    </td>
                  </tr>
                  <tr>
                    <td>Santunan Sembako</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 24 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 24 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Yatim Piatu Dhuafa</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 25 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 25 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Biaya Hidup Individu</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 26 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 26 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Zakat fitrah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 27 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 27 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Bea-Guru</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 28 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 28 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-semibold">
                      Bantuan Pendidikan-Fakir Miskin
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Beasiswa Rutin</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 29 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 29 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Beasiswa Putus</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 30 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 30 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Buku & Perlengkapan Sekolah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 31 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 31 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Prasarana Pendidikan</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 32 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 32 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-semibold">
                      Bantuan Kesehatan-Fakir Miskin
                    </td>
                  </tr>
                  <tr>
                    <td>Pengobatan Individu</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 33 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 33 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Baksos Kesehatan</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 34 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 34 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Klinik (Pusesling Gratis)</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 35 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 35 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-semibold">
                      Bantuan Pemberdayaan Ekonomi-Fakir Miskin
                    </td>
                  </tr>
                  <tr>
                    <td>Pembinaan Ekonomi Lemah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 36 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 36 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Modal Usaha</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 37 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 37 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-semibold">Bantuan Emergency</td>
                  </tr>
                  <tr>
                    <td>Recovery dan Rehabilitasi Daerah Kumuh/Tertinggal</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 38 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 38 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Rescue Bencana - Konflik</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 39 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 39 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Recovery Bencana</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 40 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 40 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Zakat Fakir Miskin Regional</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 41 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 41 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>

                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranFakir || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranFakir || 0
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Gharimin</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 42 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 42 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Zakat Gharimin Regional</td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 43 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 43 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalGharimin || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalGharimin || 0
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Muallaf</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 44 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 44 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Zakat Muallaf Regional</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 45 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 45 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalZakatMualaf || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalZakatMualaf || 0
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Kafalah Da'i</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 46 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 46 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Pelatihan Da'i</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 47 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 47 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Pembinaan Umat (Dakwah)</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 48 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 48 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Prasarana Dakwah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 49 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 49 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Sarpras Pendidikan</td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 50 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 50 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan untuk Palestina</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 51 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 51 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Zakat Fisabilillah Regional</td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 52 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 52 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalZakatFisabilillah || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalZakatFisabilillah || 0
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Ibnu Sabil</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 53 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 53 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Zakat Ibnu Sabil Regional</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 54 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 54 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalZakatIbnu || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalZakatIbnu || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Jumlah Penyaluran Dana Zakat */}
              <table className="table table-bordered">
                <tbody>
                  <tr className="fw-bold">
                    <td className="col-6">Jumlah Penyaluran Dana Zakat</td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalZakat || 0
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
                            )[0]?.totalZakat || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Penerimaan Dana Infak/Sedekah */}
            <CardBody className="border-bottom">
              <div className="mb-2">
                <h5 className="fw-bold">14. Penerimaan Dana Infak/Sedekah</h5>
                <p>
                  Rincian penerimaan dana infak/sedekah adalah sebagai berikut:
                </p>
              </div>

              <div className="mb-0">
                <p className="fw-bold">1. Penerimaan Infak Terikat-Donatur</p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Penerimaan Infak untuk Palestina</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 205 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 205 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Infak Program Khusus</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 207 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 207 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
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
                    <td className="text-end">
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
                </tbody>
              </table>

              <div className="mb-0">
                <p className="fw-bold">
                  2. Penerimaan Infak Tidak Terikat-Donatur
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Peneriman Infak Jumat</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 208 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 208 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Infak Potong Gaji</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 209 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 209 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Kotak Infak</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 210 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 210 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Infak Ceramah Umum</td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 211 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 211 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Infak Ramadhan</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 212 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 212 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Infak/Sedekah Umum</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 213 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 213 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Infak 1000 Quran</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 214 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 214 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Fidyah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 215 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 215 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTidakTerikatDonatur || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalInfakTidakTerikatDonatur || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mb-0">
                <p className="fw-bold">
                  3. Penerimaan Infak Tidak Terikat - non Donatur
                </p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Pendapatan Bagi Hasil Bank Syariah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 201 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 201 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Pengembalian Dana Bergulir</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 217 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 217 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Pengembalian Dana Program</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 218 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 218 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanInfakNonDonatur || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanInfakNonDonatur || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-bordered">
                <tbody>
                  <tr className="fw-bold">
                    <td className="col-6">Jumlah Penerimaan Dana Infak</td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanInfak || 0
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
                            )[0]?.totalPenerimaanInfak || 0
                          )
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>

            {/* Penyaluran Dana Infak/Sedekah */}
            <CardBody className="border-bottom">
              <div className="mb-2">
                <h5 className="fw-bold">15. Penyaluran Dana Infak/Sedekah</h5>
                <p>
                  Rincian penyaluran dana infak dan sedekah adalah sebagai
                  berikut:
                </p>
              </div>

              <div className="mb-0">
                <p className="fw-bold">1. Penyaluran Infak Terikat</p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Bantuan Dana Kemanusiaan Palestina</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 62 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 62 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penyaluran Dana Qurban</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 222 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 222 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Program Khusus</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 223 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 223 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bantuan Rescue</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 224 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 224 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {" "}
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
                    <td className="text-end">
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
                </tbody>
              </table>

              <div className="mb-0">
                <p className="fw-bold">2. Penyaluran Infak Tidak Terikat</p>
              </div>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Program Pendidikan</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 55 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 55 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Program Dakwah</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 58 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 58 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Program Kesehatan</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 59 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 59 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Program Sosial</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 60 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 60 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penyaluran Amil</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 228 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 228 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Alokasi Pemanfaatan Aset Kelolaan</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 25 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 25 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
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
                    <td className="text-end">
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
                    <td className="col-6">Jumlah Penyaluran Dana Infak</td>
                    <td className="text-end col-3">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenyaluranInfak || 0
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
                            )[0]?.totalPenyaluranInfak || 0
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Bagian Amil atas Dana Zakat</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 219 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 219 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Bagian Amil atas Dana Infak</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 220 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 220 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Penerimaan Amil Lainnya</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 221 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 221 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanDanaAmil || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenerimaanDanaAmil || 0
                          )
                        : 0}
                    </td>
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
                    <th scope="col" className="col-6"></th>
                    <th scope="col" className="text-end col-3">
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
                    <th scope="col" className="text-end col-3">
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
                    <td>Gaji Amil</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 63 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 63 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Pengembangan SDM</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 66 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 66 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Beban Amil Cabang</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 230 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 230 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Bank</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 231 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 231 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Alat Tulis Kantor</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 64 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 64 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Prasarana Sekretariat</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 67 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 67 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Pengembangan Aplikasi</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 232 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 232 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Pelayanan Muzakki</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 233 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 233 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Penyusutan Aktiva Tetap</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 234 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 234 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Sosialisasi ZIS</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 235 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 235 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Lain-Lain</td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 364 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear - 1
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {" "}
                      {Array.isArray(dataQuery.data) &&
                      dataQuery.data.length > 0
                        ? numberWithCommas(
                            dataQuery.data.filter(
                              val =>
                                val.gla_id === 364 &&
                                val.period === selectedMonth &&
                                val.year === selectedYear
                            )[0]?.ending_balance || 0
                          )
                        : 0}
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td></td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear - 1 &&
                                val.period === selectedMonth
                            )[0]?.totalPenggunaanDanaAmil || 0
                          )
                        : 0}
                    </td>
                    <td className="text-end">
                      {Array.isArray(dataQuery.summaryPerPeriod) &&
                      dataQuery.summaryPerPeriod.length > 0
                        ? numberWithCommas(
                            dataQuery.summaryPerPeriod.filter(
                              val =>
                                val.year === selectedYear &&
                                val.period === selectedMonth
                            )[0]?.totalPenggunaanDanaAmil || 0
                          )
                        : 0}
                    </td>
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

export default CALK
