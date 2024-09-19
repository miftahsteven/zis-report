import React, { useEffect, useMemo, useState } from "react";
import '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../components/TableContainer';
import { numberFormat } from "lib/numberFormat";

//import components
import Breadcrumbs from '../../../../../components/Common/Breadcrumb';

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
import useMutateDataProgram from "../hooks/useMutateDataProgram";

const ProgramNonInternal = () => {

    //meta title
    document.title = "Program List | Dashboard Finansial";


    const { data, isLoading: loading } = useMutateDataProgram()
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
                header: "Program Title",
                accessorKey: "program_title",
                enableColumnFilter: false,
                enableSorting: true,
            },
            // {
            //     header: 'Program Category',
            //     accessorKey: "name",
            //     enableColumnFilter: false,
            //     enableSorting: true,
            //     cell: (cellProps) => {
            //         const desc = cellProps.getValue();
            //         return <span className="badge badge-soft-info">{desc}</span>;
            //     },
            // },
            {
                header: "Program Category",
                accessorKey: "program_category_id",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    const gla_type = Number(cellProps.getValue());
                    if (gla_type === 0) {
                        return <span className="badge badge-soft-secondary">Tidak Diketahui</span>;
                    } else if (gla_type < 9) {
                        return <span className="badge badge-soft-success">{cellProps.row.original.name}</span>;
                    } else if (gla_type >= 9 && gla_type <= 17) {
                        return <span className="badge badge-soft-warning">{cellProps.row.original.name}</span>;
                    } else if (gla_type === 98 || gla_type === 99) {
                        return <span className="badge badge-soft-info">{cellProps.row.original.name}</span>;
                    } else if (gla_type !== 98 || gla_type !== 99 && gla_type > 17) {
                        return <span className="badge badge-soft-danger">{cellProps.row.original.name}</span>;
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
                accessorKey: "program_status",
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cellProps) => {
                    switch (cellProps.row.original.program_status) {
                        case 1:
                            return <Badge className="bg-success">Active</Badge>
                        case "New":
                            return <Badge className="bg-info">New</Badge>
                        case 0:
                            return <Badge className="bg-danger">Inactive</Badge>
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
                    <Breadcrumbs title="Program" breadcrumbItem="Program List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody className="border-bottom">
                                            <div className="d-flex align-items-center">
                                                <h5 className="mb-0 card-title flex-grow-1">Program List</h5>

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


export default ProgramNonInternal;