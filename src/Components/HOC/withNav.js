import Nav from "../Nav";

const withNav = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Nav/>
        <WrappedComponent {...props}/>
      </>
    );
  };
}

export default withNav;
