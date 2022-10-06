import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useFetchPolicyQuery , useAddPolicyMutation ,useDeletePolicyMutation ,useEditArtistMutation } from '../lib/policyApi'


import PolicyDetail from '../components/PolicyDetail'
import PolicyTable from '../components/PolicyTable'



function Artist() {
  const { data:dataForPolicy, error, isLoading } = useFetchPolicyQuery()
  const [addArtist , result] = useAddPolicyMutation()
  const [deletePolicy , resultfordelete] = useDeletePolicyMutation()
  const [editTheArtist , resultforEdit] = useEditArtistMutation()
  // const [tableData,setTableData] = useState([])
  const [onFormEdit,setFormEdit] = useState(false)
  const [onEditData,setEditData] = useState<any>({})
//   const artistList = useSelector((state) => state.artistList)
//   const dispatch = useDispatch()

//   const { artists} = artistList

//   useEffect(()=>{
//     console.log("whats1");
  
//     //  dispatch(fetchArtist())
  


//   //  console.log(tableData);

//  },[dispatch,data])


const onDelete = (id:string)=>{
  console.log(id);
  deletePolicy(id)

}

const onEdit = (data: { _id: string; name: string ;limit:number;amount:string })=>{
  console.log(data);
  // dispatch(editUser(id,name))
  setFormEdit(true)
  setEditData(data)

}

const userDetailFormSumit = (name:string,limit:number,amount:number,isEditable:boolean) =>{
  console.log(name,isEditable);
  if(!isEditable){
    addArtist({name,limit,amount})
  } else{
    editTheArtist({uid:onEditData._id,name})
    setFormEdit(false)



  }

}

  return (
    <div>
        <PolicyDetail isEditable={onFormEdit} editData={onEditData} onFormSubmit={userDetailFormSumit}/>
        <br/>
        <PolicyTable users={isLoading|| error?[]:dataForPolicy} onDeleteClick={onDelete} onEditClick={onEdit} />

    </div>
  )
}

export default Artist