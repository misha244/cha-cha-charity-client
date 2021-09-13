import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import LoginForm from "../components/LoginForm";
import { MOBILE_BREAKPOINT } from "../mediaQueries";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

const Login = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  return (
    <div>
      <Container
        className={classes.container}
        maxWidth={isMobile ? "sm" : "md"}
        style={{ paddingTop: "16px", paddingBottom: "16px" }}
      >
        <LoginForm />
      </Container>
    </div>
  );
};

export default Login;
