const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center bg-black/5 h-screen items-center">
      {children}
    </div>
  );
};

export default layout;
