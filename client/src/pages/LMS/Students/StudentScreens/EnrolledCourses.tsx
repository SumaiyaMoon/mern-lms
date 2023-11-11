import { Delete, Get } from "../../../../config/axios/api-methods";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SMTableContainer from "../../../../components/table/SMTableContainer";
import SMTableRow from "../../../../components/table/SMTableRow";

export default function EnrolledCourses() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<any>([]);

  let getData = () => {
    Get("course")
      .then((res) => {
        console.log(res.data.data); // Logging the actual course data from the API response
        setCourseData(res.data.data); // Setting the course data in the state
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SMTableContainer
        cols={[
          {
            heading: "Id",
            key: "id",
          },
          {
            heading: "Course",
            key: "coursename",
          },
          {
            heading: "Short Name",
            key: "shortname",
          },
          {
            heading: "Fee",
            key: "fee",
          },
        ]}
      >
        {
          courseData && courseData.length > 0 ? (
            courseData.map((x: any, i: number) => (
              <SMTableRow
                onClick={() => {
                  navigate(`${x._id}`);
                }}
                keyIndex={x._id}
                Id={i + 1}
                Name={x.courseName || "N/A"}
                Email={x.shortName || "N/A"}
                Active={x.courseFee || "N/A"}
              />
            ))
          ) : (
            <p>Loading...</p>
          ) // Optional: Add a loading message or spinner
        }
      </SMTableContainer>
    </>
  );
}
