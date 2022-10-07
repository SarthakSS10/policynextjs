import React, { useEffect } from "react";
import ClaimDetail from "../components/ClaimDetail";
import { wrapper } from "../lib/store";
import { getPolicyStatus, getRunningOperationPromises } from "../lib/userApi";

function claim({
    policies,
  }: {
    policies: any;
  }) {


  return (
    <div>
      <ClaimDetail       policy={policies ? policies.data : []}
 />
    </div>
  );
}

export default claim;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getPolicyStatus.initiate());

    let val1: any = await Promise.allSettled<any>([
      getRunningOperationPromises(),
    ]);

    let temp = await val1[0].value[0];

    return {
      props: {
        policies: temp,
      },
    };
  }
);
