import React from 'react'
import UserPolicyDetail from '../components/UserPolicyDetail'
import { wrapper } from "../lib/store";
import { fetchUser, getRunningOperationPromises } from "../lib/userApi";
import {
  fetchPolicy,
  getRunningOperationPromises as getRunningOperationPromisesForAlbum,
} from "../lib/policyApi";

function UserPolicy({
  userList,
  policyList,
}: {
  userList: any;
  policyList: any;
}) {
  console.log(userList);
  console.log("policyList",policyList);

  
  return (
    <div>
      <UserPolicyDetail 
      policy={policyList ? policyList.data : []}
        users={userList ? userList.data : []}
        />
      

    </div>
  )
}

export default UserPolicy

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(fetchPolicy.initiate());
    store.dispatch(fetchUser.initiate());

    let val1:any = await Promise.allSettled<any>([
      getRunningOperationPromises(),
      getRunningOperationPromisesForAlbum(),
    ]);

    let temp = await val1[0].value[0];
    let temp1 = await val1[1].value[0];

    return {
      props: {
        userList: temp,
        policyList: temp1,
      },
    };
  }
);
