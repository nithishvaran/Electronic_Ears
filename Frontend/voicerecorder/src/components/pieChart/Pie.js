import React from "react";
import Chart from 'react-apexcharts'

const Pieart =({n,d})=>{
return(
<div>
<Chart 
type="pie"
width={600}
height={600}
series={[n,d]}
options={{
          labels:['Non-Distracted','Distracted'],
          tooltip:{
               y:{
                    formatter:(val)=>{
                         return `$${val}`
                    }
               }
          },
          title:{
               text:"Pie Chart"
          }
     }}

>

</Chart>
</div>
      );
};

export default Pieart;