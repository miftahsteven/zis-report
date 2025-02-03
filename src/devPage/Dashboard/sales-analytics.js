import React, {useState, useEffect} from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import useMutateGraphPerprogram from '../../hooks/useMutateGraphPerprogram';


const SalesAnalytics = ({ dataColors }) => {
  const apexSalesAnalyticsChartColors = getChartColorsArray(dataColors);
  const [dataGraphPerprogram, setDataGraphPerprogram] = useState([])
  const { mutate, isLoading } = useMutateGraphPerprogram();
  const [dataGraphValue, setDataGraphValue] = useState([])
  const [dataGraphProgram, setDataGraphProgram] = useState([])
  const [dataGabungin, setDataGabungan] = useState([])
  const series = [56, 38, 26];
  const options = {
    labels: dataGraphProgram, //["Series A", "Series B", "Series C"],
    colors: ['#5e86d6', '#E5C6A0', '#669DB5', '#94A74A', '#3e6147','#945962', '#93C3EE'],//apexSalesAnalyticsChartColors,
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  useEffect((values) => {
    //const arrayData
    mutate(values , 
      { 
        onSuccess : (data) => {          
          
            //console.log("Data From DB",data.data.dataGabungan[0].namaprogram);            
            setDataGraphProgram(data.data.dataNamaProgram);
            setDataGraphValue(data.data.dataValue);
            setDataGabungan(data.data.dataGabungan);
            console.log("Data From DB4", dataGabungin);           
        },
        onError :(error) => {
            const message = error.response.data.message          
        }
      }
    ); 
  },[])

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Pengajuan PerProgram</h4>

            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={dataGraphValue}
                  type="pie"
                  height={260}
                  className="apex-charts"
                />
              </div>
            </div>

            <div className="text-muted">       
            <div>Top Program</div>  
            <Row xs={9}>       
                {                  
                  dataGabungin.map((items, key) => (
                    key < 4 ?                    
                <Col xs="6" key={key}>                  
                  <div className="mt-2">
                    <p className="mb-2">
                      <i className="mdi mdi-circle text-primary me-1" /> {items.namaprogram}                      
                    </p>
                    <h5>{items.total} </h5>
                  </div>
                </Col>
                :null
                ))}
                {/* <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Product
                      B
                    </p>
                    <h5>$ 1,763</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Product
                      C
                    </p>
                    <h5>$ 973</h5>
                  </div>
                </Col> */}
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SalesAnalytics;
