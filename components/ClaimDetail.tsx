import React,{useEffect, useState}from 'react'
import { Button, Table } from "react-bootstrap";
import {useAddUpdateClaimsMutation,getPolicyStatus} from "../lib/userApi"




function ClaimDetail(props:any) {
    const [pending , setPending] = useState([])
    const [approve , setApprove] = useState([])
    const [reject , setReject] = useState([])
    const [addUpdateClaims , result] = useAddUpdateClaimsMutation()
    const [trigger, { isLoading, isError, data, error }] =
    getPolicyStatus.useLazyQuery();


    const statusButton = (e:any,userId:string,status:string,policyId:string) =>{
        console.log(policyId);
        
        addUpdateClaims({id:userId,status,policyId})
        console.log(result);
        


    }

    useEffect(()=>{
        console.log(props.policy);
        props.policy.map((val:any)=>{
            if(val._id === 'pending'){
                setPending(val.data)

            }
            if(val._id === 'rejected'){
                setReject(val.data)


            }
            if(val._id === 'accepted'){
                setApprove(val.data)


            }
        })
        

    },[result])

  return (
    <div>
        <p> Clamied Policies</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pid</th>
            <th>UserName</th>
            <th>PolicyName</th>
            <th>Amount</th>
            <th>Limit</th>
            <th>Req Amount</th>
            <th>Options</th>

          </tr>
        </thead>
        <tbody>
          {pending.map((data: { userId:string; policyId:string; reqAmount:string; policyName:string; amount: string; limit: string; userName: string },index) => (
            <tr key={index}>
              <td>
                {index +1}
              </td>
              <td>
               {data.userName}
              </td>
              <td>{data.policyName[0]}</td>

              <td>{data.amount[0]}</td>
              <td>{data.limit[0]}</td>
              <td>
                {data.reqAmount}
              </td>

              <td>
                <Button 
              onClick={(e) => statusButton(e,data.userId,'accepted',data.policyId[0])}
              >
                Approve
                </Button>

                <Button 
              onClick={(e) => statusButton(e,data.userId,'rejected',data.policyId[0])}
              >
                Reject
                </Button>
                </td>

    
            </tr>
          ))}
        </tbody>
      </Table>
      <br/>
      <br/>


      <p> Approved Policies</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pid</th>
            <th>UserName</th>
            <th>PolicyName</th>

          </tr>
        </thead>
        <tbody>
          {approve.map((data: {userName:string; policyName:string; amount: string; limit: string; name: string },index) => (
            <tr key={data.name}>
              <td>
                {index +1}
              </td>
              <td>
               {data.userName}
              </td>
              <td>{data.policyName[0]}</td>

            </tr>
          ))}
        </tbody>
      </Table>
      <br/>
      <br/>



      <p> Rejected Policies</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pid</th>
            <th>UserName</th>
            <th>PolicyName</th>

          </tr>
        </thead>
        <tbody>
          {reject.map((data: { userName:string; policyName:string; amount: string; limit: string; name: string },index) => (
            <tr key={data.name}>
              <td>
                {index +1}
              </td>
              <td>
               {data.userName}
              </td>
              <td>{data.policyName[0]}</td>

            </tr>
          ))}
        </tbody>
      </Table>
      <br/>
      <br/>



    </div>
  )
}

export default ClaimDetail