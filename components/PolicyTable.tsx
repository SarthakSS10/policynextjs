import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

interface Propsvalue {
  users: any;
  onDeleteClick: (id: string) => void;
  onEditClick: (data: any) => void
}

const PolicyTable: React.FC<Propsvalue> = (props) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log("hiiii", props);
    setTableData(props.users);
  }, [props]);

  const deleteButton = async (e: any, id: string) => {
    e.preventDefault();
    props.onDeleteClick(id);
  };
  const editButton = async (e: any, data: { _id: string; name: string ; limit:number ;amount:number }) => {
    e.preventDefault();
    console.log(data);
    props.onEditClick(data);
  };
  console.log("render");
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Delete</th>
            <th>Uid</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data: { _id: string; name: string ; limit:number ;amount:number  }) => (
            <tr key={data._id}>
              <td>
                <Button onClick={(e) => editButton(e, data)}>Edit</Button>
              </td>
              <td>
                <Button onClick={(e) => deleteButton(e, data._id)}>
                  Delete
                </Button>
              </td>
              <td>{data._id}</td>
              <td>{data.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PolicyTable;
