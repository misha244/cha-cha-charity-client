import classNames from "classnames";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { LOGIN } from "../../graphql/mutations";

import { useUserContext } from "../../contexts/UserProvider";

import sign from "../../assets/images/illustrations/whole-images/sign-in.png";

import "./LoginForm.css";

const useStyles = makeStyles((theme) => ({
  imageDiv: {
    width: "100%",
  },
  paper: {
    padding: "16px 0px",
  },
  form: {
    padding: 16,
  },
  formControl: {
    padding: "8px 16px",
    minWidth: "100%",
  },
  formLabel: {
    padding: "8px 16px",
  },
  formTitle: {
    padding: "16px",
    textAlign: "center",
    fontWeight: "600",
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  let history = useHistory();
  const { dispatch } = useUserContext();

  const { handleSubmit, control } = useForm();

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const payload = {
        token: data.login.token,
        email: data.login.user.email,
        id: data.login.user.id,
      };

      localStorage.setItem("user", JSON.stringify(payload));

      dispatch({
        type: "LOGIN",
        payload,
      });
      history.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (formData) => {
    await login({
      variables: {
        loginInput: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
  };

  const renderAccountDetails = () => (
    <Box>
      <Typography variant="h5" className={classes.formTitle}>
        Enter your info
      </Typography>
      <Box component="div" m={1}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl className={classes.formControl}>
              <InputLabel
                className={classNames(classes.formControl, {
                  "form-error": error,
                })}
              >
                Email Address
              </InputLabel>
              <Input value={value} onChange={onChange} error={!!error} />
            </FormControl>
          )}
        />
      </Box>
      <Box component="div" m={1}>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl className={classes.formControl}>
              <InputLabel
                className={classNames(classes.formControl, {
                  "form-error": error,
                })}
              >
                Password
              </InputLabel>
              <Input
                type="password"
                value={value}
                onChange={onChange}
                error={!!error}
              />
            </FormControl>
          )}
        />
      </Box>
    </Box>
  );

  return (
    <Paper elevation={3} className={classes.paper}>
      <img className={classes.imageDiv} alt="mhm" src={sign} />
      <Typography variant="h3" className={classes.formTitle}>
        Login
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {renderAccountDetails()}
        <Divider />
        <Box component="div" m={1} className={classes.formTitle}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disableElevation
            size="large"
          >
            Login
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LoginForm;
