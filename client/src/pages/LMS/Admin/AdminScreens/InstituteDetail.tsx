import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fbGet, fbGetByID } from "../../../../config/firebase/firebase-methods";

export default function InstituteDetail() {
  const [instituteDetail, setInstituteDetail] = useState<any>({});
  const { id } = useParams();

  const getInstitute = () => {
    fbGetByID("users", `${id}`)
      .then((res: any) => {
        console.log(res);

        setInstituteDetail({ ...res });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    getInstitute();
  }, []);

  return (
    <>
      <Box>
        <div key={id}>
          <img src={instituteDetail.instituteLogo} alt={"Logo"} />
          <h1>Institute Name: {instituteDetail.instituteName}</h1>
          <h1>Institute Short Name: {instituteDetail.instituteShortName}</h1>
          <p>Institute Campuses: {instituteDetail.campusesDetail}</p>
          <p>Institute Campuses Detail: {instituteDetail.campusesDetail}</p>
          <p>Institute Id: {instituteDetail.id}</p>
          <p>Institute Email: {instituteDetail.email}</p>
          <p>
            Institute Status:
            {instituteDetail.isActive ? "Active" : "Not Active"}
          </p>
          <p>Address: {instituteDetail.instituteAddress}</p>
          <p>Location: {instituteDetail.instituteLocation}</p>
          <p>Contact: {instituteDetail.instituteContact}</p>
          <p>Owner's Contact: {instituteDetail.instituteOwnerContact}</p>
          <p>Owner's Email: {instituteDetail.instituteOwnerEmail}</p>
        </div>
      </Box>
    </>
  );
}
