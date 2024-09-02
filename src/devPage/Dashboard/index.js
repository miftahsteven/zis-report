import React, {useEffect, useState} from "react"
import { Container, Row, Col, Toast, ToastBody, ToastHeader } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import useMutateDataMustahiq from '../../hooks/useMutateDataMustahiq';

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import Earning from "./earning"
import SalesAnalytics from "./sales-analytics"
import TotalSellingProduct from "./total-selling-product"
import Tasks from "./tasks"
import ChatBox from "./chat-box"
import logouniversal from "../../assets/images/zis-logo.png"


const DashboardSaas = () => {
  const { mutate, isLoading } = useMutateDataMustahiq();
  const [dataReport, setDataReport] = useState([])
  const [errorData, setErrorData] = useState(false);
  const [toast, setToast] = useState(false);  
  const [labelToast, setLabelToast]  = useState();
  const toggleToast = (q) => {    
    setToast(!toast);
  };
  
  useEffect((values) => {       
      
    mutate(values , 
      { 
        onSuccess : (data) => {
            //const allData = JSON.parse(data)
            console.log("SEMUA DATA", data.data);    
            setDataReport(data.data)
            
        },
        onError :(error) => {
            const message = error.response.data.message
            setErrorData(true);
            setLabelToast(message);                        
            toggleToast(message);
            //console.log("TOS", error.response.data.message);                
        }
      }
    ); 


  }, []);

  //meta title
  document.title = "Ziswaf Indosat | Dashboard"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Report" />

          {/* Card User */}
          <CardUser />

          <Row>
            {/* welcome card */}
              

            <Col xl="12">
              <Row>
                {/*mimi widgets */}
                <MiniWidget reports={dataReport} />
              </Row>
            </Col>
          </Row>

          <Row>
            {/* earning */}
            <Earning dataColors='["--bs-primary"]' />

            {/* sales anytics */}
            <SalesAnalytics dataColors='["--bs-primary", "--bs-success", "--bs-danger"]' />
          </Row>

          <Row>
            {/* total selling product */}
            <TotalSellingProduct />

            {/* tasks */}
            <Tasks />

            {/* chat box */}
            <ChatBox />
          </Row>
        </Container>
      </div>
      <div className="position-fixed top-0 end-0 p-3" >
            <Toast isOpen={toast}>
                <ToastHeader className="background-black" toggle={toggleToast}>
                    <img src={logouniversal} alt="" className="me-2" height="18" />
                    Dashboard ZISWAF
                </ToastHeader>
                <ToastBody style={{ color: errorData? 'red':'black' }}>
                    {labelToast} 
                </ToastBody>
            </Toast>
        </div>
    </React.Fragment>
  )
}

export default DashboardSaas
