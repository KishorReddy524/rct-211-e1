import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetailsFailure, getProfileDetailsRequest, getProfileDetailsSuccess } from "../Redux/action";
 import ProfileDataRow from "../Components/ProfileDataRow";
const Homepage = () => {
  const profileData = useSelector((store)=>store.profileData);
  const dispatch = useDispatch();

  const getProfileData =()=>{
    dispatch(getProfileDetailsRequest());
    axios.get("http://localhost:8080/profile")
    .then((r)=>{
      dispatch(getProfileDetailsSuccess(r.data));
      // console.log(r.data)
    })
    .catch((e)=>{
      dispatch(getProfileDetailsFailure(e))
    });
  };

  useEffect(()=>{
    if(profileData.length === 0){
      getProfileData()
      
    }
  },[])

  
  return (
    <div>
      <table style={{margin:"auto"}}>
        <thead style={{ fontWeight: "700" }} className="table-heading">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th style={{width: "150px"}}>First Name</th>
            <th style={{width: "150px"}}>Last Name</th>
            <th style={{width: "150px"}}>Email</th>
            <th style={{width: "150px"}}>Gender</th>
            <th style={{width: "150px"}}>Country</th>
          </tr>
        </thead>
        <tbody data-cy="profile-wrapper">
          {/* Map through the profileData received from the json-server on mounting the component to show it in a table format */
           
          }
          {profileData?.length > 0 && profileData.map((item)=>{
            return <ProfileDataRow key={item.id} profile={item} />
          })}
          
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
