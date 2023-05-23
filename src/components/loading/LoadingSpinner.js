import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ styling }) => {
  return <div className={`${classes.spinner} ${styling}`}></div>;
};

export default LoadingSpinner;
