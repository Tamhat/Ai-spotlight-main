import Categories from "./Categories";
import SearchInput from "./SearchInput";

const Hero = () => {
  return (
    <section className="wrapper mt-10">
      <div className="space-y-5 flex items-center justify-center flex-col">
        <h1 className="text-5xl uppercase font-bold">Ai Spotlights</h1>
        <h2 className="text-xl uppercase font-medium brightness-75">
          THE LARGEST AI TOOLS DIRECTORY, UPDATED DAILY
        </h2>
      </div>

      <div className="mt-5">
        <SearchInput/>
        <Categories />
      </div>
    </section>
  );
};

export default Hero;
