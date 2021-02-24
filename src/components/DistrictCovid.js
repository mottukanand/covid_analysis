import React, { useEffect, useState } from 'react';
import {
    Container, Card, CardHeader, CardTitle, CardBody, Button, InputGroup,
    Input,
} from 'reactstrap';
import Header from './Header';
import TableComponent from './TableComponent';
import { useHistory, useParams } from "react-router-dom";
import background from "../assets/img/covidjpg.jpg";

const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

const DistrictCovid = () => {

    const history = useHistory();
    const { stateName, code } = useParams();

    const [stateCovid, setStateCovid] = useState("");
    const [finalState, setFinalState] = useState("");
    const [searchData, setSearchData] = useState("");
    const [inputData, setInputData] = useState("");

    useEffect(() => {
        fetch('https://api.covid19india.org/state_district_wise.json')
            .then(response => response.json())
            .then(data => setStateCovid(data));
    }, []);

    useEffect(() => {
        if (stateCovid) {
            let selectedStateData = Object.values(stateCovid).filter(val => val.statecode === code);
            if (selectedStateData && selectedStateData.length) {
                let newArr = []
                for (let i in selectedStateData[0]["districtData"]) {
                    let obj = {};
                    obj.name = i;
                    obj = { ...obj, ...selectedStateData[0]["districtData"][i] }
                    newArr.push(obj)
                }
                setFinalState(newArr);
                setSearchData(newArr);
            } else {
                setFinalState([]);
            }
        }
    }, [stateCovid]);

    const handleSearchData = (e) => {
        if (e.target.value) {
            let filterData = finalState.filter(val => val.name.toLowerCase().includes(e.target.value.trim().toLowerCase()));
            setSearchData(filterData);
        } else {
            setSearchData(finalState);
        }
        setInputData(e.target.value);
    }


    return (
        <>
            <Header />
            <div style={{ backgroundImage: `url(${background})` }}>
                <Container>
                    <Card>
                        <CardHeader className="btnStyle" style={datastyle}>
                            <CardTitle style={{ fontSize: "1.1rem" }}>
                                <b>{stateName.toUpperCase()} - COVID ANALYSIS</b>
                                <Button color="primary" style={{ float: "right" }} onClick={() => history.goBack()}> Go BACK</Button>
                            </CardTitle>
                            <InputGroup>
                                <Input type="text" placeholder="Search District Name Here..." value={inputData} onChange={(e) => handleSearchData(e)} />
                            </InputGroup>

                        </CardHeader>
                        <CardBody>
                            <TableComponent finalState={searchData} stateData={false} />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default DistrictCovid