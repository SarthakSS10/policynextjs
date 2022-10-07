import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useForm, Resolver } from "react-hook-form";
import {useAddUpdateClaimsMutation} from "../lib/userApi"

type FormValues = {
  users: string;
  policy: string;
  policyAmount: Number;
  policyLimit: Number;
};

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.firstName ? values : {},
//     errors: !values.firstName
//       ? {
//           firstName: {
//             type: 'required',
//             message: 'This is required.',
//           },
//         }
//       : {},

//   };
// };

function UserPolicyDetail(props: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { policy: "", users: "" } });
  const [limit, setLimit] = useState();
  const [amount, setAmount] = useState();
  const [tableData,setTableData]   = useState([])
  const [reqAmount,setReqAmount] = useState()
  const [addUpdateClaims , {data:editResponse}] = useAddUpdateClaimsMutation()



  const onSubmit: any = handleSubmit((data) => {
    console.log(data)
    let val:any = {...data,limit,amount}
    setTableData([val])
});

const handleChange = (e:any) =>{
    setReqAmount(e.target.value)
}
const claimButton = (e:any,data:any) =>{
    console.log(data);
    // console.log(reqAmount);

    addUpdateClaims({id:data.users.split(',')[1],reqAmount:reqAmount,policyId:data.policy.split(',')[3]})
    setTableData([])
    reset()
    setLimit('')
    setAmount('')
    setReqAmount()


    
    
}
const deleteButton = (e:any) =>{
    setTableData([])
    reset()
    setLimit("")
    setAmount("")
    setReqAmount()


}

  return (
    <div>
      <form
        style={{ alignContent: "center" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <br />
        <p> Select user</p>

        <select placeholder="Select a User" {...register("users")}>
          {props.users.map((val: any) => (
            <option key={val._id} value={[val.name,val._id]}>
              {val.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <p> Select Policy</p>

        <select
          placeholder="Select a Policy"
          {...register("policy", {
            onChange: (e) => {
              console.log(e.target);
              let val = e.target.value.split(",");
              setAmount(val[1]);
              setLimit(val[0]);
            },
          })}
        >
          {props.policy.map((val: any) => (
            <option
              defaultValue={""}
              key={val._id}
            //   tagName={[val.policyLimit, val.policyAmount]}
            //   value={val.name}
              value={[val.policyLimit, val.policyAmount,val.name,val._id]}
            //   currentTarget={[val.policyLimit, val.policyAmount]}

            >
              {val.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <p> policy Amount</p>
        <input readOnly value={amount} />
        <br />
        <br />
        <p>policy Limit</p>
        <input readOnly value={limit} />
        <br />
        <br />

        <input type="submit" />
        <br />
        <br />
      </form>
      <br/>
      <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>UserName</th>
            <th>PolicyName</th>
            <th>Amount</th>
            <th>Limit</th>
            <th>Req Amount</th>
            <th>Claim</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {tableData.map((data: { users:string; policy:string; amount: string; limit: string; name: string },index) => (
            <tr key={data.name}>
              <td>
                {index +1}
              </td>
              <td>
               {data.users.split(',')[0]}
              </td>
              <td>{data.policy.split(',')[2]}</td>

              <td>{data.amount}</td>
              <td>{data.limit}</td>
              <td>
                <input  className='mb-3'
            type ="number"
            value={reqAmount}
            onChange={(e)=>handleChange(e)}
            name="req amount">
                </input>
              </td>

              <td><Button onClick={(e) => claimButton(e,data)}>
                Claim
                </Button></td>

                <td><Button onClick={(e) => deleteButton(e)}>
                Delete
                </Button></td>


            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserPolicyDetail;
