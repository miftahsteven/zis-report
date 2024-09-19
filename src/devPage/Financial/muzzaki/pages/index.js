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

const Muzzaki = () => {

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
                    const tgl = format(new Date(cellProps.getValue()), 'dd MMMM yyyy')
                    return <span>{tgl}</span>
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
                    <Breadcrumbs title="Muzzaki" breadcrumbItem="Muzzaki List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody className="border-bottom">
                                            <div className="d-flex align-items-center">
                                                <h5 className="mb-0 card-title flex-grow-1">Muzzaki List</h5>

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


export default Muzzaki;