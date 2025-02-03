import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import useMutateGraphPenyaluran from '../../hooks/useMutateGraphPenyaluran';
//actions
import { getEarningChartsData } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useQueryClient } from '@tanstack/react-query';
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { XAxis } from "recharts";

const Earning = ({ dataColors, dataPenyaluran, dataPerbandingan }) => {
  const [dataGraphPenyaluran, setDataGraphPenyaluran] = useState([])
  //const [dataPenyaluranState, setDataPenyaluranState] = useState(dataPenyaluran)
  const appearingChartColors = getChartColorsArray(dataColors);
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutateGraphPenyaluran();
  
  const numberWithCommas = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const dates = new Date();
  const bulanName = dates.toLocaleString('default', { month: 'long' });
  
  const DashboardSaasProperties = createSelector(
    (state) => state.DashboardSaas,
    (dashboardSaas) => ({
      earningChartData: dashboardSaas.earningChartData,
    })
  );

  const {
    earningChartData
  } = useSelector(DashboardSaasProperties);

  const arrayBulan = ["","Jan","Fab", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

  const options = {
    chart: {
      toolbar: "false",
      colors: ['#5e86d6', '#E5C6A0', '#669DB5', '#94A74A', '#3e6147','#945962', '#93C3EE'],
      dropShadow: {
        enabled: !0,
        color: "#000",
        top: 18,
        left: 7,
        blur: 8,
        opacity: 0.2,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return numberWithCommas(String(value));
        }
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return arrayBulan[value]
        }
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: ['#5e86d6', '#E5C6A0', '#669DB5', '#94A74A', '#3e6147','#945962', '#93C3EE'],
    stroke: {
      curve: "smooth",
      width: 3,
    },
  };  
  /*
  call api action to receive data
  */
  useEffect((values) => {
    dispatch(getEarningChartsData('9'));    
    mutate(values , 
      { 
        onSuccess : (data) => {          
          
            //console.log(JSON.stringify(data.data));            
            setDataGraphPenyaluran(data.data)
            
        },
        onError :(error) => {
            const message = error.response.data.message
            //setErrorData(true);
            //setLabelToast(message);                        
            //toggleToast(message);
            //console.log("TOS", error.response.data.message);                
        }
      }
    ); 
  }, [dispatch]);

  const series = [
    {
      name: "Series 1",
      //data: [...earningChartData],      
      data: [23,12,12,22,90,18,25]
    },    
    {
      name: "Series 2",
      //data: [...earningChartData],      
      data: [30,34,45,38,67,45,67]
    }, 
  ];

  const [selectedMonth, setSelectedMonth] = useState('9');


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
                    <p>{bulanName}</p>
                    <h4>{ dataPenyaluran }</h4>
                    <div>
                      <span className="badge badge-soft-success font-size-12 me-1">
                        {" "}
                        {dataPerbandingan} {" "}
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
                    series={dataGraphPenyaluran}
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
