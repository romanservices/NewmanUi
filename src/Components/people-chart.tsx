import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import React,{useState, useCallback, useEffect} from 'react';
  import { People } from "../API/newman-api"
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


interface Props {
    peopleList:People[];
}
export const PeopleChart =({peopleList}:Props) =>{
    const [data, setData] =  useState({
        labels: peopleList.map((m)=>`${m.firstName} ${m.lastName}`),
        datasets: [{
          label: 'Possession Count',
          data: peopleList.map((m)=>m.possessions?.length),
          backgroundColor: [
            'rgb(153, 102, 255)'
          ],
          borderColor: [
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      });
      
     const buildData = useCallback(()=>{
      setData({
        labels: peopleList.map((m)=>`${m.firstName} ${m.lastName}`),
        datasets: [{
          label: 'Possession Count',
          data: peopleList.map((m)=>m.possessions?.length),
          backgroundColor: [
            'rgb(153, 102, 255)'
          ],
          borderColor: [
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      });
     },[peopleList])

      useEffect(()=>{
        buildData();
      },[buildData]);
    return (
        <Bar data={data}/>
        );
}