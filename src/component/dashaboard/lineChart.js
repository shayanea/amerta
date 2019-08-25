import React from "react";
import { Layout } from "zent";
import Highcharts from "highcharts";
import HC_more from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
HC_more(Highcharts);

const { Col } = Layout;

const lineChart = props => {
  return (
    <Col span={props.width}>
      <div style={{ margin: "10px", boxShadow: "0px 6px 20px 0 rgba(109,109,109,0.1)", backgroundColor: "#fff" }}>
        <HighchartsReact highcharts={Highcharts} options={props.options} />
      </div>
    </Col>
  );
};

export default lineChart;
