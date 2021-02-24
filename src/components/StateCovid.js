import React, { useEffect, useState } from 'react';
import { Container, Card, CardHeader, CardTitle, CardBody, InputGroup, Input, } from 'reactstrap';
import Header from './Header';
import TableComponent from './TableComponent';
import background from "../assets/img/covidjpg.jpg";

const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

const StateCovid = () => {

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
            let finalStateData = []
            Object.keys(stateCovid).filter(val => val !== "State Unassigned")
                .forEach(value => {
                    let newObj = {};
                    newObj.name = value;
                    newObj.code = stateCovid[value]["statecode"]
                    let arr = []
                    for (let i in stateCovid[value]["districtData"]) {
                        let obj = {};
                        obj.districtName = i;
                        obj = { ...obj, ...stateCovid[value]["districtData"][i] }

                        arr.push(obj)
                    }

                    let confirmed = reduceValue(arr, "confirmed");
                    let recovered = reduceValue(arr, "recovered");
                    let deceased = reduceValue(arr, "deceased");
                    newObj.confirmed = confirmed;
                    newObj.recovered = recovered;
                    newObj.deceased = deceased;
                    finalStateData.push(newObj);
                })
            setFinalState(finalStateData)
            setSearchData(finalStateData)
        }
    }, [stateCovid]);

    const reduceValue = (arr, type) => {
        return arr.reduce((total, value) => {
            return value[type] + total
        }, 0);
    }

    const handleSearchData = (e) => {
        if (e.target.value) {
            let filterData = finalState.filter(val => val.name.toLowerCase().includes(e.target.value.trim().toLowerCase()));
            setSearchData(filterData)
        } else {
            setSearchData(finalState)
        }
        setInputData(e.target.value)
    }

    return (
        <>
            <Header />
            <div style={{ backgroundImage: `url(${background})` }}>
                <Container>
                    <Card >
                        <CardHeader className="btnStyle" style={datastyle}>
                            <CardTitle style={{ fontSize: "1.1rem" }}>
                                <b>INDIA - COVID ANALYSIS</b>

                            </CardTitle>
                            <InputGroup>
                                <Input type="text" placeholder="Search State Name Here..." value={inputData} onChange={(e) => handleSearchData(e)} />
                                {/* <InputGroupAddon addonType="append">
                                <Button color="primary">Go</Button>
                            </InputGroupAddon> */}
                            </InputGroup>
                        </CardHeader>
                        <CardBody>
                            <TableComponent finalState={searchData} stateData={true} />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default StateCovid