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
import useMutateDataAktifitas from "../hooks/useMutateDataAktifitas";

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Aktifitas = () => {

    //meta title
    document.title = "Report Aktifitas | Dashboard Report";


    const { data, isLoading: loading } = useMutateDataAktifitas()
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
                accessorKey: "nama",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Tanggal Daftar',
                accessorKey: "created_date",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const tgl = format(new Date(cellProps.getValue()), 'dd MMMM yyyy', { locale: id })
                    return <span>{tgl}</span>
                }
            },
            {
                header: "Jenis Peserta",
                accessorKey: "iskomunitas",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const tipe = Number(cellProps.getValue());
                    if (tipe === 1) {
                        return <span className="badge badge-soft-danger">Komunitas</span>;
                    } else if (tipe === 0) {
                        return <span className="badge badge-soft-info">Inividu</span>;
                    }
                },
            },
            {
                header: 'Referentor',
                enableColumnFilter: false,
                enableSorting: true,
                accessorKey: "referentor_nama",
            },
            {
                header: 'Nominal',
                enableColumnFilter: false,
                enableSorting: true,
                accessorKey: "total_biaya",
                cell: (cellProps) => {
                    const nominal = Number(cellProps.getValue());
                    return <span className="">{numberFormat(nominal)}</span>;
                },
            },
            {
                header: 'Status',
                accessorKey: "midtrans_status_log",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    switch (cellProps.row.original.midtrans_status_log) {
                        case "settlement":
                            return <Badge className="bg-success">Settlement</Badge>
                        case "pending":
                            return <Badge className="bg-info">Pending</Badge>
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
                    <Breadcrumbs title="Aktifitas" breadcrumbItem="Report Aktifitas" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody className="border-bottom">
                                            <div className="d-flex align-items-center">
                                                <h5 className="mb-0 card-title flex-grow-1">Report Aktifitas</h5>

                                            </div>
                                        </CardBody>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={tableData || []}
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


export default Aktifitas;