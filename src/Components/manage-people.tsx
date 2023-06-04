import React,{useState, useCallback,useEffect, useRef} from 'react';
import { PeopleTable } from './people-table';
import { PeopleForm } from './add-people';
import { PeopleChart } from './people-chart';
import { useApi } from '../API/use-api';
import { People } from '../API/newman-api';
import { Button } from "react-bootstrap";

function ManagePeople(){
    const [peopleData,setPeopleData] = useState<People[]>();
  const api = useApi();

  const peopleLoaded = useRef<boolean>(false);
  const loadPeople = useCallback(async ()=>{
    await api.stubList().then(data=>{
      setPeopleData(data.data);
    })
  },[api]);
  const refreshPeople = useCallback(()=>{loadPeople()},[loadPeople]);
  useEffect(()=>{
    if(!peopleLoaded.current){
      refreshPeople();
      peopleLoaded.current = true;
    }
  });
  return (
    <div>
        <Button onClick={()=>refreshPeople()}>Re-Load People</Button>
        <PeopleForm refreshPeople={()=>refreshPeople()} ></PeopleForm>
        {peopleData && <PeopleTable peopleList={peopleData!} refreshPeople={()=>refreshPeople()}></PeopleTable>}
        {peopleData && <PeopleChart peopleList={peopleData!}></PeopleChart>}
    </div>
  );
}
export default ManagePeople;