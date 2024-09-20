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
import useMutateDataWakaf from "../hooks/useMutateDataWakaf";

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Wakaf = () => {

    //meta title
    document.title = "Report Wakaf | Dashboard Report";


    const { data, isLoading: loading } = useMutateDataWakaf()
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
                header: "Nama Mitra",
                accessorKey: "mitra_nama",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Nama Program",
                accessorKey: "program.program_title",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Referentor",
                accessorKey: "mitra_register", // Use the array key
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const referentorNama = cellProps.getValue()?.[0]?.referentor?.referentor_nama;
                    return <span>{referentorNama || 'Unknown'}</span>;
                },
            },
            {
                header: 'Tanggal Pengajuan',
                accessorKey: "created_date",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const tgl = format(new Date(cellProps.getValue()), 'dd MMMM yyyy', { locale: id })
                    return <span>{tgl}</span>
                }
            },
            {
                header: "Nomor Kontrak",
                accessorKey: "mitra_no_kontrak",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const kontrak = cellProps.getValue() || '-'
                    return <span>{kontrak}</span>
                }
            },
            {
                header: 'Nominal Pengajuan',
                enableColumnFilter: false,
                enableSorting: true,
                accessorKey: "mitra_register",
                cell: (cellProps) => {
                    const nominal = cellProps.getValue()?.[0]?.mitra_reg_nominal;
                    return <span className="">{numberFormat(nominal ? Number(nominal) : 0)}</span>;
                },
            },
            {
                header: 'Status',
                accessorKey: "ispaid",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const proposal = cellProps.row.original;
                    //Status Condition
                    const tlhBayar = proposal?.status_bayar || 0;
                    const perBayar = proposal?.approved || 0;
                    const statAcc = proposal?.mitra_approval?.filter(approval => approval.status === 1).length || 0;

                    //IF Else
                    if (tlhBayar === 1) {
                        return <Badge className="bg-success">Telah di Transfer</Badge>
                    } else if (perBayar === 1) {
                        return <Badge className="bg-info">Disetujui</Badge>
                    } else if (perBayar === 2) {
                        return <Badge className="bg-danger">Tidak Disetujui</Badge>
                    } else if (statAcc <= 4) {
                        return <Badge className="bg-warning">Dalam Proses</Badge>
                    } else {
                        return <Badge className="bg-secondary">Status Tidak Diketahui</Badge>
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
                    <Breadcrumbs title="Wakaf" breadcrumbItem="Report Wakaf" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody className="border-bottom">
                                            <div className="d-flex align-items-center">
                                                <h5 className="mb-0 card-title flex-grow-1">Report Wakaf</h5>

                                            </div>
                                        </CardBody>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={tableData}
                                                isCustomPageSize={true}
                                                isGlobalFilter={true}
                                                isJobListGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search for ..."
                                                tableClass="align-middle table-nowrap dt-responsive nowrap w-100 table-check dataTable no-footer dtr-inline mt-4 border-top"
                                                pagination="pagination"
                                                paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                    }
                </div>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
}


export default Wakaf;