import React, {useEffect, useState} from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import useMutateDataReferentor from '../../hooks/useMutateDataReferentor';

const barchart = ({dataColors}) => {
  const spineareaChartColors = getChartColorsArray(dataColors);
  const { mutate, isLoading } = useMutateDataReferentor();
  //const [dataReferentor, setDataReferentor] = useState([])
  const [arrayReferentor, setArrayRef] = useState([])
  const [arrayJmlPerreferentor, setArrayJmlPerreferentor] = useState([])

  const series = [
    {
      data: arrayJmlPerreferentor//[380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365],
    },
  ]
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },

    colors: spineareaChartColors,
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: arrayReferentor
      // [
      //   "South Korea",
      //   "Canada",
      //   "United Kingdom",
      //   "Netherlands",
      //   "Italy",
      //   "France",
      //   "Japan",
      //   "United States",
      //   "China",
      //   "Germany",
      // ],
    },
  }

  useEffect((values) => {       
       
    mutate(values , 
      { 
        onSuccess : (data) => {
            //const allData = JSON.parse(data)
            console.log("SEMUA DATA REF=====>>>>>>", data.data.dataValue);    
            setArrayRef(data.data.dataAllReferentor)
            setArrayJmlPerreferentor(data.data.dataValue)
            
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

  return (
    <ReactApexChart options={options} series={series} type="bar" height="350" />
  )
}

export default barchart
