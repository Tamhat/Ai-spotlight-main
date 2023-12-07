import { MdFavorite, MdVerified } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import Button, { buttonVariants } from "./Button";

const ToolsCard = ({ item }) => {
  return (
    <div className="rounded-md bg-cyprus/95 dark:bg-white brightness-110 overflow-hidden shadow-xl max-h-full pb-[60px]">
      <Link to={`/tool-details/${item?.title.replace(/\s+/g, "-")}`}>
        <img
          src={item?.toolsImage}
          alt={item?.title}
          className="object-cover cursor-pointer rounded-t-md hover:scale-110 transition-all duration-700 h-[200px] w-full"
        />
      </Link>

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center gap-2">
            <Link
              to={`/tool-details/${item?.title.replace(/\s+/g, "-")}`}
              className="text-xl font-semibold hover:text-cyan cursor-pointer line-clamp-1 capitalize"
            >
              {item?.title}
            </Link>
            {item?.verified === true && (
              <MdVerified className="text-blue-600 h-5 w-5" />
            )}
          </div>

          <div className="flex justify-between items-center gap-2">
            <MdFavorite className="text-red-500 h-6 w-6 cursor-pointer" />
            {item?.ratings}
          </div>
        </div>

        <Rating
          className="text-[24px]"
          initialRating={item?.ratings}
          readonly
          emptySymbol={<span className="text-gray-300">&#9734;</span>}
          fullSymbol={<span className="text-yellow-400">&#9733;</span>}
        />

        <p className="line-clamp-2">{item?.subtitle}</p>

        <ul>
          {item?.tags?.map((item, index) => (
            <li key={index} className="lowercase line-clamp-1">
              # {item}
            </li>
          ))}
        </ul>

        <div className="toolscard__bottom flex justify-between">
          <Button colors="transparent">
            <MdFavorite className="h-5 w-5" />
          </Button>

          <Link
            to={item?.websiteLink}
            className={buttonVariants({ colors: "primary" })}
            target="_blank"
          >
            <div className="flex items-center gap-2">
              Visit <FiExternalLink />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolsCard;
