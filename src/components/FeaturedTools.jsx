import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ToolsCard from "./ToolsCard";

const FeaturedTools = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["featuredTools"],
    queryFn: () =>
      axios
        .get("https://ai-spotlight-server.vercel.app/api/v1/tools/featured-tools")
        .then((res) => res.data),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error.message}
      </div>
    );
  return (
    data?.length > 0 && (
      <section className="wrapper mt-10">
        <h2 className="text-xl font-medium brightness-90 mb-5 text-center">
          Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item) => (
            <ToolsCard key={item?._id} item={item} />
          ))}
        </div>
      </section>
    )
  );
};

export default FeaturedTools;
