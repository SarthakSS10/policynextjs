import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import UserDetail from "../components/UserDetail"
import UserTable from "../components/UserTable"

import { wrapper } from "../lib/store";
import {
    fetchUser,
    getRunningOperationPromises,
    useFetchUserQuery,
    useAddUserMutation,useDeleteUserMutation,useEditUserMutation
  } from "../lib/userApi";


function User (){
    const [onFormEdit,setFormEdit] = useState(false)
    const [onEditData,setEditData] = useState({})
    // const userList = useSelector((state:any) => state.userList)
    // const dispatch = useDispatch()
  
    // const { users} = userList
        const { data:dataAdd, error, isLoading } = useFetchUserQuery()
        console.log("ddddddddddddddddd",dataAdd);
        
    const [addPost , {data:userResponse,isSuccess:isUserSuccess,isError:isUserError}] = useAddUserMutation()
    const [deleteTheUser , {data:deleteResponse}] = useDeleteUserMutation()
    const [editTheUser , {data:editResponse}] = useEditUserMutation()


    useEffect(()=>{

    },[])

   

    const onDelete = async(id:string)=>{
        console.log(id);
        deleteTheUser(id)
      }
      
      const onEdit = (data: { _id: string; name: string })=>{
        console.log(data);
        setFormEdit(true)
        setEditData(data)
      
      }

      const userDetailFormSumit = (name:string,uid:string,isEditable:boolean) =>{
        console.log(name,uid,isEditable);
        if(!isEditable){
        addPost({uid,name})
      
        } else
        {
          editTheUser({uid,name})
          setFormEdit(false)

        }
      
      }
    
    return(
        <>
        <UserDetail isEditable={onFormEdit} editData={onEditData} onFormSubmit={userDetailFormSumit}/>
        {/* <UserTable users={users} onDeleteClick={onDelete} onEditClick={onEdit}/> */}
        <UserTable users={isLoading|| error?[]:dataAdd} onDeleteClick={onDelete} onEditClick={onEdit}/>

        </>
    )

}
// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async () => {
//         console.log("hiiiiii");

//     //   const name = context.params?.name;
//     // //   if (typeof name === "string") {
//         store.dispatch(fetchUser.initiate());    //   }
  
//       let val = await Promise.all(getRunningOperationPromises());
//       console.log("valxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",val[0]);
      
  
//       return {
//         props: {
//             data:val[0]
//         },
//       };
//     }
//   );



export default User