import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fbSignUp } from "../../config/firebase/firebase-methods";
import SMInput from "../../components/SMInput";
import SMButton from "../../components/SMButton";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { Get, Post } from "../../config/axios/api-methods";
import SMStudentReg from "./SMForms/SMStudentReg";

export default function SMSignUp() {
  const [model, setModel] = useState<any>({});
  const fillModel = (key: string, val: string) => {
    model[key] = val;
    setModel({ ...model });
  };

  const navigate = useNavigate();

  return (
    //  <Box
    //       className="bg_img_login"
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         height: "100vh",
    //       }}
    //     >
    //       <Paper className="paperColor" elevation={3} sx={{ p: 3, maxWidth: 400 }}>
    //         <Typography variant="h6" className="fw-bold" gutterBottom>
    //           Select an option to Sign Up,
    //         </Typography>
    //         <form>
    //           <Grid container spacing={1}>
    //             <Grid item xs={12}>
    //               <SMButton
    //                 type="button"
    //                 label="SignUp as Student"
    //                 onClick={()=>{navigate("/studentreg")}}
    //                 className="py-2"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <SMButton
    //                 type="button"
    //                 label="SignUp as Teacher"
    //                 onClick={()=>{navigate("/teacherreg")}}
    //                 className="py-2"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <SMButton
    //                 type="button"
    //                 label="SignUp as Institute"
    //                 onClick={()=>{navigate("/institutereg")}}
    //                 className="py-2"
    //               />
    //             </Grid>

    //             <Grid
    //               item
    //               xs={12}
    //               className="d-flex justigy-content-between align-items-center gap-5"
    //             >
    //               <Typography className="py-2">
    //                 Already Signed Up? <Link to="/Login" >Login</Link>
    //               </Typography>
    //             </Grid>
    //           </Grid>
    //         </form>
    //       </Paper>
    //     </Box>
    <SMStudentReg />
  );
}
