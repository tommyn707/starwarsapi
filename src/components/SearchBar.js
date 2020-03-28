import React from "react";

const SearchBar = (props) => {

    return (
        <div>
            <form onSubmit={props.submit}>
                <label>
                   Search for:
                    <select value={props.state} onChange={props.change}>
                        <option value="people">People</option>
                        <option value="planets">Planets</option>
                        <option value="starships">Star ships</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="species">Species</option>
                    </select>
                </label>
                 ID: <input type='number' min='1' max='100' value={props.idState} onChange={props.idxChange}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default SearchBar