const Skeleton = () => {
  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="h-10 max-w-md mx-auto mb-6 rounded-md bg-slate-300 animate-pulse"></h1>
        <div className="flex bg-slate-300 animate-pulse items-center justify-center sm:max-w-[500px] w-full mx-auto h-80 rounded-2xl" />
        <div className="pt-8">
          {new Array(6).fill(0).map((_, i) => (
            <p
              className="h-4 my-2 rounded-md bg-slate-300 animate-pulse"
              key={i}
            ></p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skeleton;
