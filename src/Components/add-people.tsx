import React,{useState, useCallback} from "react";
import Select from "react-select"
import { useApi } from '../API/use-api';
import { PeopleCreateModel } from '../API/newman-api';
interface Props {
    refreshPeople:()=>void;
}
export const PeopleForm =({refreshPeople}:Props) =>{
    const options = [
        { label: "House", value: 0 },
        { label: "Car", value: 1 },
        { label: "Dog", value: 2 }
      ];
      const arry: string[] = [];
      const api = useApi();
      const [possessions,setPossessions] = useState(arry);
      const [firstName,setFirstName]=useState("");
      const [lastName,setLastName]=useState("");
      const handleSubmit = () => {
        //Add validation
        addPerson({firstName:firstName,lastName:lastName,possessions:possessions});
      }
      const addPerson = useCallback(async (model:PeopleCreateModel)=>{
        await api.stubCreate(model).then(()=>{
            refreshPeople();
        });
       
      },[api,refreshPeople]);
    return (
    <form onSubmit={handleSubmit}>
        <label>
            First Name: <input 
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}></input>
        </label>
        <label>
            Last Name: <input 
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}></input>
        </label>
        <label>Possession
            <Select
            options={options}
            isMulti
            onChange={(e) => setPossessions(e.map(m=>m.label))}
            ></Select>
        </label>
        <input type="submit" value={"Add Person"}></input>
     
    </form>
    );
    }