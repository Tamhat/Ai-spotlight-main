import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ToolsCard from "./ToolsCard";

const Tools = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["approvedTools"],
    queryFn: () =>
      axios
        .get("https://ai-spotlight-server.vercel.app/api/v1/tools/approved-tools")
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
    <section className="wrapper my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((item, index) => (
          <ToolsCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Tools;
