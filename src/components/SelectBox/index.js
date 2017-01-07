import React from 'react'
import { FormControl } from 'react-bootstrap'

const SelectBox = ({ data, defaultValue, action, disabled }) => {
    return (
      <FormControl
        componentClass="Select"
        defaultValue={defaultValue}
        disabled={disabled ? true : false}
        onChange={e => action(e.target.value)}>
        { data.map((rec, i) =>  {
            return <option
                    value={rec.id}
                    key={rec.id}>
                    {rec.name}
                   </option>
        })}
      </FormControl>
    );

}

export default SelectBox;
