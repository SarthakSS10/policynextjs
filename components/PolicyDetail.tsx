import React, { useState, useEffect } from "react";
interface Propsvalue {
  isEditable: boolean;
  editData: any;
  onFormSubmit: any;
}

const PolicyDetail: React.FC<Propsvalue> = (props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("")
  const [limit, setLimit] = useState("")

  const [editable, setEditable] = useState(true);

  const handleChange = (event: any) => {
    setEditable(false);
    setName(event.target.value);
  };
  const handleChangeAmount = (event: any) => {
    setEditable(false);
    setAmount(event.target.value);
  };
    const handleChangeLimit = (event: any) => {
    setEditable(false);
    setLimit(event.target.value);
  };
  const onSubmitForm = () => {
    props.onFormSubmit(name,limit,amount, props.isEditable);
    setName("");
    setAmount('')
    setLimit('')
    // window.location.reload(true)
    // setUUID(`ui-${uuid().split('-')[0]}`)
    setEditable(true);
  };

  return (
    <div>
      <div className="mb-5">
        <strong> Policy Details</strong>

        <br />
        <input
          className="mb-3"
          type="text"
          value={props.isEditable && editable ? props.editData.name : name}
          onChange={(e) => handleChange(e)}
          name="name"
          placeholder="Policy Name"
        ></input>
        <br />
        <input
          className="mb-3"
          type="number"
          value={props.isEditable && editable ? props.editData.policyAmount : amount}
          onChange={(e) => handleChangeAmount(e)}
          name="amount"
          placeholder="Policy Amount"
        ></input>
        <br /><input
          className="mb-3"
          type="number"
          value={props.isEditable && editable ? props.editData.policyLimit : limit}
          onChange={(e) => handleChangeLimit(e)}
          name="limit"
          placeholder="Policy Limit"
        ></input>
        <br />
        <button className="mb-3" onClick={onSubmitForm}>
          {props.isEditable ? "edit" : "add"}
        </button>
      </div>
      <br />
    </div>
  );
};

export default PolicyDetail;
