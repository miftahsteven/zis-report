import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

//actions
import { getEarningChartsData } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const Earning = ({ dataColors }) => {
  const appearingChartColors = getChartColorsArray(dataColors);
  const dispatch = useDispatch();

  const DashboardSaasProperties = createSelector(
    (state) => state.DashboardSaas,
    (dashboardSaas) => ({
      earningChartData: dashboardSaas.earningChartData,
    })
  );

  const {
    earningChartData
  } = useSelector(DashboardSaasProperties);

  const options = {
    chart: {
      toolbar: "false",
      dropShadow: {
        enabled: !0,
        color: "#000",
        top: 18,
        left: 7,
        blur: 8,
        opacity: 0.2,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: appearingChartColors,
    stroke: {
      curve: "smooth",
      width: 3,
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [...earningChartData],
    },
  ];

  /*
  call api action to receive data
  */
  useEffect(() => {
    dispatch(getEarningChartsData("jan"));
  }, [dispatch]);

  const [selectedMonth, setSelectedMonth] = useState("jan");


  const onChangeMonth = value => {
    setSelectedMonth(value);
    dispatch(getEarningChartsData(value));
  };

  return (
    <React.Fragment>
      <Col xl="8">
        <Card>
          <CardBody>
            <div className="clearfix">
              <div className="float-end">
                <div className="input-group input-group-sm">
                  <select className="form-select form-select-sm" value={selectedMonth}
                    onChange={(e) => { onChangeMonth(e.target.value); }}>
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Nov</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>                                        
                  </select>
                  <label className="input-group-text">Bulan</label>
                </div>
              </div>
              <h4 className="card-title mb-4">Penyaluran ZISWAF</h4>
            </div>

            <Row>
              <Col lg="4">
                <div className="text-muted">
                  <div className="mb-4">
                    <p>Agustus</p>
                    <h4>IDR 34,530,000</h4>
                    <div>
                      <span className="badge badge-soft-success font-size-12 me-1">
                        {" "}
                        + 0.2%{" "}
                      </span>{" "}
                      Dari bulan lalu
                    </div>
                  </div>

                  {/* <div>
                    <Link to="#" className="btn btn-primary  btn-sm">
                      View Details{" "}
                      <i className="mdi mdi-chevron-right ms-1"></i>
                    </Link>
                  </div> */}

                  {/* <div className="mt-4">
                    <p className="mb-2">Last month</p>
                    <h5>$2281.04</h5>
                  </div> */}
                </div>
              </Col>

              <Col lg="8">
                <div id="line-chart" dir="ltr">
                  <ReactApexChart
                    series={series}
                    options={options}
                    type="line"
                    height={320}
                    className="apex-charts"
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default Earning;
