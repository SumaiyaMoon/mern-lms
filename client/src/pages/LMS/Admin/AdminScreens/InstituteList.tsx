import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import SMTable from "../../../../components/SMTable";
import SMButton from "../../../../components/SMButton";
import { useNavigate } from "react-router-dom";
import { fbGet } from "../../../../config/firebase/firebase-methods";
import SMTableContainer from "../../../../components/table/SMTableContainer";
import SMTableRow from "../../../../components/table/SMTableRow";
export default function InstituteList() {
  const [instituteList, setInstituteList] = useState<any[]>([]);

  const getInstitute = () => {
    fbGet("users")
      .then((res: any) => {
        console.log(res);
        setInstituteList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInstitute();
  }, []);

  let tableData = [
    {
      instituteName: "Sir Adamjee Institute",
      logoImage: "Img",
      NoOfCampuses: "1",
      Status: "Active",
    },
    {
      instituteName: "Simplilearn",
      logoImage: "Img",
      NoOfCampuses: "1",
      Status: "inActive",
    },
  ];
  let role = "institute";
  const navigate = useNavigate();

  return (
    <>
      <Box className="d-flex align-items-center justify-content-center flex-column">
        <div>
          <div className="d-flex align-items-center justify-content-between py-2">
            <p className="m-2 fw-bold">Institute List</p>
            <SMButton
              label="Add Institute"
              onClick={() => {
                navigate("/institutereg");
              }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-around">
            <SMTableContainer
              cols={[
                {
                  heading: "Id",
                  key: "id", // This should match the key in your student data
                },
                {
                  heading: "Name",
                  key: "instituteName", // This should match the key in your student data
                },
                {
                  heading: "Email",
                  key: "email", // This should match the key in your student data
                },
                {
                  heading: "Active",
                  key: "isActive", // This should match the key in your student data
                },
              ]}
            >
              {instituteList && instituteList.length > 0 && instituteList
                ? instituteList
                    .filter(
                      (institute) =>
                        institute.role &&
                        institute.role.toLowerCase() === "institute"
                    )
                    .map((institute: any, i: number) => (
                      // if (role == "institute" || "Institute") {}
                      <SMTableRow
                        keyIndex={i}
                        Id={i + 1}
                        Name={institute.instituteName || "N/A"} // Handle empty instituteName
                        Email={institute.email || "N/A"} // Handle empty email
                        Active={institute.isActive ? "Yes" : "No"}
                        onClick={() => {
                          navigate(`${institute.id}`);
                        }}
                      />
                    ))
                : null}
            </SMTableContainer>

            <div></div>
          </div>
        </div>
      </Box>
    </>
  );
}
