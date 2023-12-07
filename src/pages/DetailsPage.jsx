import { Link, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { buttonVariants } from "../components/Button";
import ToolsCard from "../components/ToolsCard";
import { FaFacebook } from "react-icons/fa";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { AiFillYoutube } from "react-icons/ai";

const DetailsPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["approvedTools"],
    queryFn: () =>
      axios
        .get("https://ai-spotlights-server.vercel.app/tools/approved-tools")
        .then((res) => res.data),
  });

  const toolDetails = useLoaderData();
  const {
    title,
    subtitle,
    description,
    category,
    websiteLink,
    toolsImage,
    youtubeLink,
    facebookLink,
    videoReviewLink,
    discordLink,
    twitterLink,
    linkedinLink,
  } = toolDetails.data;

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

  const relatedTools = data
    .filter((tool) => tool.category === category && tool.title !== title)
    .slice(0, 6);

  return (
    <main className="wrapper my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 mb-10">
        <img
          src={toolsImage}
          alt={title}
          className="w-full h-auto rounded-lg"
        />

        <div className="space-y-5">
          <h2 className="text-3xl font-bold capitalize">{title}</h2>
          <h4 className="text-lg">{subtitle}</h4>

          <Link
            to={websiteLink}
            className={buttonVariants({ colors: "transparent", size: "small" })}
            target="_blank"
          >
            View Deal
          </Link>

          {(facebookLink ||
            discordLink ||
            twitterLink ||
            linkedinLink ||
            youtubeLink) && (
            <div className="space-y-2">
              <p>Social Links</p>
              <div className="flex gap-3 text-2xl">
                {facebookLink && (
                  <Link to={facebookLink} target="_blank">
                    <FaFacebook />
                  </Link>
                )}

                {linkedinLink && (
                  <Link to={twitterLink} target="_blank">
                    <ImLinkedin />
                  </Link>
                )}

                {twitterLink && (
                  <Link to={twitterLink} target="_blank">
                    <BsTwitter />
                  </Link>
                )}

                {youtubeLink && (
                  <Link to={youtubeLink} target="_blank">
                    <AiFillYoutube />
                  </Link>
                )}

                {discordLink && (
                  <Link to={discordLink} target="_blank">
                    <BsDiscord />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="font-bold text-xl capitalize">{title} Features </h3>
        <p
          className="space-y-5 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {videoReviewLink && (
          <div className="space-y-5">
            <p className="font-bold capitalize">{title} Video Review</p>
            <p dangerouslySetInnerHTML={{ __html: videoReviewLink }} />
          </div>
        )}
      </div>

      {relatedTools.length > 0 && (
        <div className="my-10">
          <p className="font-bold text-2xl mb-5">Similar Category Tools </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedTools.map((item, index) => (
              <ToolsCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default DetailsPage;
