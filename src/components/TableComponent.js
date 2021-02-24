import React from 'react';
import { Table } from 'reactstrap';
import { useHistory, } from "react-router-dom";

const TableComponent = ({ finalState, stateData }) => {

    const history = useHistory();

    return (
        <>
            <Table responsive hover striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>State</th>
                        <th>Confirmed</th>
                        <th>Recovered</th>
                        <th>Deceased </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        finalState && finalState.length ?
                            finalState.map((data, index) =>
                                <tr className={stateData ? "pointer" : ""} key={index} onClick={() => { stateData && history.push(`/${data.name}/${data.code}`) }}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.name}</td>
                                    <td>{data.confirmed}</td>
                                    <td>{data.recovered}</td>
                                    <td>{data.deceased}</td>
                                </tr>
                            )

                            :
                            <tr>
                                <th colSpan={5}>No Results Found</th>
                            </tr>
                    }

                </tbody>
            </Table>
        </>
    )
}

export default TableComponent