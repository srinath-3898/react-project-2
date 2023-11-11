import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/authContext";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: state.valid, isValid: state.isValid };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: state.value, isValid: state.isValid };
};

const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }

  return { value: state.value, isValid: state.isValid };
};

const Login = () => {
  const { onLogin } = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dipatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collegeIsValid } = collegeState;

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dipatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dipatchPassword({ type: "INPUT_BLUR" });
  };

  const valiDateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    } else {
    }
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && collegeIsValid > 0);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid]);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          label={"Email"}
          isValid={emailState.isValid}
          type={"email"}
          id={"email"}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          placeHolder={"Please enter your email"}
        />
        <Input
          ref={passwordInputRef}
          label={"Password"}
          isValid={passwordState.isValid}
          type={"password"}
          id={"password"}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          placeHolder={"Please enter your password"}
        />
        <Input
          label={"College Name"}
          isValid={collegeState.isValid}
          type={"text"}
          id={"college"}
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={valiDateCollegeHandler}
          placeHolder={"Please enter your college name"}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
