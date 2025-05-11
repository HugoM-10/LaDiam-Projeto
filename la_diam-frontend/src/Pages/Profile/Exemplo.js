import React from 'react';
import { FormGroup } from "reactstrap";

const Exemplo = ({label,value,onChange,isDisabled=false,type="text"}) => {
    return (
        <FormGroup>
          <label>{label}:</label>
          <input
            type={type}
            name={label}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
          />
        </FormGroup>
    );
};

export default Exemplo;