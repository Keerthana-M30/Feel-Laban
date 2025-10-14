const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-accent/20 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-float-slow" />
    </div>
  );
};

export default FloatingElements;
