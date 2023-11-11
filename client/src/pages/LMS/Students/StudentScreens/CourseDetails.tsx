import { Get } from "../../../../config/axios/api-methods";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<any>({});
  const { id } = useParams();

  const getData = () => {
    Get("course", id)
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
  }, [id]); // Fetch the data whenever 'id' changes

  if (Object.keys(courseData).length !== 0) {
    return (
      <>
        <div>
          <h2>{courseData.courseName}</h2>
          <p>Short Name: {courseData.shortName}</p>
          <p>Fee: {courseData.courseFee}</p>
          {/* Display other course details as needed */}
        </div>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
