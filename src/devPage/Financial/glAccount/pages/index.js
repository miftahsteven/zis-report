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
import useMutateDataGL from "../hooks/useMutateDataGL";

const GlAccount = () => {

    //meta title
    document.title = "GL Account List | Dashboard Finansial";


    const { data, isLoading: loading } = useMutateDataGL()
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
                header: "GL Account",
                accessorKey: "gl_account",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'GL Name',
                accessorKey: "gl_name",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Type",
                accessorKey: "gl_type",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const gla_type = Number(cellProps.getValue());
                    if (gla_type < 10) {
                        return <span className="badge badge-soft-success">{cellProps.row.original.gla_type}</span>;
                    } else if (gla_type === 10 || gla_type === 11) {
                        return <span className="badge badge-soft-warning">{cellProps.row.original.gla_type}</span>;
                    } else if (gla_type === 12 || gla_type === 13) {
                        return <span className="badge badge-soft-info">{cellProps.row.original.gla_type}</span>;
                    } else {
                        return <span className="badge badge-soft-danger">{cellProps.row.original.gla_type}</span>;
                    }
                },
            },
            {
                header: 'Nominal',
                enableColumnFilter: false,
                enableSorting: true,
                accessorKey: "nominal",
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
                        case "active":
                            return <Badge className="bg-success">Active</Badge>
                        case "New":
                            return <Badge className="bg-info">New</Badge>
                        case "inactive":
                            return <Badge className="bg-danger">Inactive</Badge>
                    }
                }
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="GL Account" breadcrumbItem="GL Account List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody className="border-bottom">
                                            <div className="d-flex align-items-center">
                                                <h5 className="mb-0 card-title flex-grow-1">GL Account List</h5>

                                            </div>
                                        </CardBody>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={data.data || []}
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


export default GlAccount;