import { useState, useCallback } from 'react';

import axios from 'axios';
import Lottie from "lottie-react";
import ProgressDialog from 'src/components/ProgressDialog';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Dialog, DialogContent, CircularProgress, Alert,  } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import farmeranimation from '../../../public/assets/farmeranimation.json';
import { Iconify, } from 'src/components/iconify';
import secureLocalStorage from 'react-secure-storage';



// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
   const [email,setEmail]  = useState("233546101171");
  const [password,setPassword]  = useState("233546101171");
  const [loginerror,setloginerror]  = useState(false);
  const [loginprovider,setloginprovider]  = useState(0);
  const [loginerrormessage,setloginerrormessage]  = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login =  async (email,password,loginprovider) => {
    setloginerrormessage("")
    setloginerror(false)
    console.log("email is " + email + " password is " + password + " login provider is " + loginprovider)
//console.log(email,password,loginprovider)

  const SaveCredentials = async(userdetails) =>{
    
    try {
         secureLocalStorage.setItem(
            "logincredentials",
            JSON.stringify({
               userid: userdetails.user.userid,
      access_token: userdetails.access_token,
      role: userdetails.user.role,
      title: userdetails.user.title,
			firstname: userdetails.user.firstname,
      lastname: userdetails.user.lastname,
			othername: userdetails.user.othername,
      nextofkin: userdetails.user.nextofkin,
			nextofkincontact: userdetails.user.nextofkincontact,
      profilepicurl: userdetails.user.profilepicurl,
			idtype: userdetails.user.idtype,
      idnumber: userdetails.user.idnumber,
			emailnotify: userdetails.user.emailnotify,
      smsnotify: userdetails.user.smsnotify,
			primarycontact: userdetails.user.primarycontact,
      auxilliarycontact: userdetails.user.auxilliarycontact,
      username:email.trim(),
      email:userdetails.user.email,
      password:password
            })
        );
        

    } catch (error) {
        // There was an error on the native side
        console.log(error)
    }
   }
  
  
      const URL = "https://api.cropestate.com/api/user/login/";
      
      
//  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//   if (reg.test(email.trim()) === false) {
//     console.log("Email is Not Correct");
//     showToast('error','Email is Not Correct',"Please try again")
  
//     return false;
//   }     
if(email.length === 0){
	//showToast('error','Empty email input',"Please try again")
  setloginerrormessage("Empty email input")
  return
	}
  else if(password.length === 0){
  //showToast('error','Empty password input',"Please try again")   
  setloginerrormessage("Empty password input") 
  return 
	//navigation.navigate("HomeScreen")
	}
	else{
    setIsLoading(true)
	let payload = { username: email.trim(), password: password, role:0,social_login_providerid:loginprovider  };
  let header = { headers: {
    // 'application/json' is the modern content-type for JSON, but some
    // older servers may use 'text/json'.
    // See: http://bit.ly/text-json
    'content-type': 'application/json'
  }
}
  let res = await axios.post(URL, payload,header )
    .catch(function (error) {
      console.log(error)
    if (error.response) {
      // Request made and server responded
      console.log(error.response);
    // showToast('error','Network error',error.response)
       
        
    } else if (error.request) {
      // The request was made but no response was received
    //  console.log(error.request);
   
     //  showToast('error','Server error',"Please try again")
    
    } else {
      // Something happened in setting up the request that triggered an Error
    //  console.log('Error', error.message);
      

    }

  })
.then(result => {
      
        console.log(axios )
        if(result.data.error)
          //showToast('error','Network error',result.data.error)
        setloginerror(true)

      if(result.data.access_token)
    {
      setloginerror(false)
      setloginerrormessage("Login successful") 
       console.log(result.data)
       SaveCredentials(result.data)
       handleSignIn();
       
     //  getstate()
      //showToast('success','Successful login',"")
   // showToast('error','Wrong login credentials',"Please try again")
    }
    else
    {
      let mess = ''
      if(loginprovider == 0)
      {
        mess = 'Wrong login credentials'
      //showToast('error',mess,"Please try again")
      setloginerrormessage(mess)
      }

      if(loginprovider == 1)
      {
        mess = 'Account not created with this Google id. Click bottom of screen to create an account '
     // showToast('error',mess,"Please try again")
      setloginerrormessage(mess)
      }

      if(loginprovider == 2)
      {
      mess = 'Account not created with this Facebook  id. Click bottom of screen to create an account '
    //  showToast('error',mess,"Please try again")
      setloginerrormessage(mess)
      }

      if(loginprovider == 4)
      {
      mess = 'Account not created with this Apple  id. Click bottom of screen to create an account '
      //showToast('error',mess,"Please try again")
      setloginerrormessage(mess)
      }
       //showToast('success','Successful login',"")
    
    }
     // showToast('error','Network error',"error.response")
      //
    })
  .finally((e)=>{
    setIsLoading(false)
   // console.log(e)
    
  });

    // let data = res.data;
  
    // {

 //console.log(loginresult);
  //console.log(email)
	//
	}
    }
  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Email address"
        onChange={(event)=>{
          //console.log(event.target.value)
          setEmail(event.target.value)
        }}
        defaultValue="233546101171"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        onChange={(event)=>{
          //console.log(event.target.value)
          setPassword(event.target.value)
        }}
        defaultValue="233546101171"
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={()=>{
         // prompt("Hello")
         login(email,password,0)
          console.log("hi")

         // handleSignIn();
        }}
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
          
        </Typography>
          <div>
              <ProgressDialog open={isLoading} message="Processing, please wait..." />
              {/* <Lottie animationData={farmeranimation} loop={true} />; */}

              {loginerrormessage!=""&&<Alert severity={loginerror ? "error" : "success"}>{loginerrormessage}</Alert>}
      {/* <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert> */}
    </div>
      </Box>
      {renderForm}
     
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton color="inherit" onClick={() => console.log("Google clicked")}>
          <Iconify width={22}  icon="socials:google" />
        </IconButton>
        <IconButton color="inherit" onClick={() => console.log("GitHub clicked")}>
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}
