import React,{useCallback} from "react";
import { Table } from "react-bootstrap";
import { People } from "../API/newman-api"
import { useApi } from '../API/use-api';
interface Props {
    peopleList:People[];
    refreshPeople:()=>void;
}
export const PeopleTable =({peopleList, refreshPeople}:Props) =>{
    const api = useApi();
    const deletePerson = useCallback(async (id:number)=>{
        await api.stubDelete(id);
        refreshPeople();
      },[api,refreshPeople]);
    const handleDelete = useCallback((id:number)=>{deletePerson(id)},[deletePerson]);
    return (
        <Table bordered striped size="sm">
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Posession Count</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {peopleList.map(item => (
                    <tr>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.possessions?.length}</td>
                        <td><input className="btn btn-danger"
                        type="button" 
                        value={"Delete"}
                        onClick={()=>handleDelete(item.id!)}></input></td>
                    </tr>
                ))}
            </tbody>
        </Table>);
}