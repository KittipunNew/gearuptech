const Layout = ({ children }) => {
  return (
    <div className="m-5 md:m-10 lg:m-20 lg:px-20 xl:px-32 flex flex-col gap-20">
      {children}
    </div>
  );
};
export default Layout;
