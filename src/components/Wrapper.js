import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import Display from "./Display";

const Wrapper = (props) => {

    let myHashMap = {
        "people": "https://swapi.co/api/people/",
        "planets": "https://swapi.co/api/planets/",
        "species": "https://swapi.co/api/species/",
        "starships": "https://swapi.co/api/starships/",
        "vehicles": "https://swapi.co/api/vehicles/"
    }
    const [state, setState] = useState('people')
    const [idState, setIdState] = useState(0)
    const [dataState, setDataState] = useState('')
    const [loadState, setLoadState] = useState(false)
    const [hadProps, setHadProps] = useState(false)
    const [reqState, setReqState] = useState(true)

    const checkValid = () => {
        if (props.wildcard || reqState === false) {
            setDataState(
                <div>
                    <li key={7}>Not the droids you are looking for ::: Please enter a valid request! <br/>
        </li>
                </div>
            )
        }
        if (dataState === '' && !props.wildcard) {
            setDataState(<h6>search for star wars information by filling out the search bar above, or navigating with
                the
                route!</h6>)
        }
        if (dataState === '  ' && loadState === false) {
            setDataState(
                <li key={9}>Not the droids you are looking for <br/></li>
            )
        }
    }


    const networkReq = async () => {
        try {
            console.log('attempt fetch')
            const response = await fetch(myHashMap[state] + idState);
            const json = await response.json()
            await gatherReqData(json)
        } catch (e) {
            console.log(e)
            alert('Bad Request ' + e)
        }

    }
    const gatherReqData = async (myData) => {
        let collection = []
        for (let key in myData) {
            if (!myData[key].includes('http') && !Array.isArray(myData[key])) {
                collection.push(<li key={key}>{key + ': ' + myData[key]}</li>)
            }
            if (key.includes('home')) {
                const response = await fetch(myData[key])
                const json = await response.json()

                collection.push(<li key={key}>{key} :
                    <button onClick={(e) => gatherReqData(json)}>
                        {json.name}</button>
                </li>)
            }
            if (key.includes('detail')) {
                collection.push(<li key={9}>Not the droids you are looking for <br/> </li>)
            }
        }
        setLoadState(false)
        setDataState(collection)

    }

    const performNetworkReq = () => {
        setLoadState(true)
        setDataState('  ')
        networkReq().then()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(state + idState)
        props.navigate(`/${state}/${idState}`);
        performNetworkReq()
    }
    const refresh = () => {
        console.log('refresh')
        console.log(state + ' in refresh')
        performNetworkReq()
    }


    useEffect(() => {
        checkValid()
        if (props.name && myHashMap[props.name] === undefined) {
            setReqState(false)
        }
        if (props.name in myHashMap && props.id !== null) {
            console.log(props.name + '/' + props.id)
            setState(props.name.toLowerCase());
            setIdState(props.id);
            setHadProps(true);
        }
        if (idState > 0) {
            refresh()
        }
    }, [hadProps, reqState])

    const handleChange = (event) => {
        setState(event.target.value)
    }
    const idxChange = (event) => {
        setIdState(event.target.value)
    }


    return (
        <div>
            <h1>STAR WARS!</h1>
            <SearchBar submit={handleSubmit} state={state} idState={idState} change={handleChange}
                        idxChange={idxChange}/>
            <Display loadState={loadState} myData={dataState}/>
        </div>
    )
}

export default Wrapper