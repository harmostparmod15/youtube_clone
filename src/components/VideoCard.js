import React from "react";
import { useSelector } from "react-redux";
import {
  convertToInternationalCurrencySystem,
  convertToNoOfDaysPosted,
} from "../utils/helper";

const VideoCard = ({ info }) => {
  const store = useSelector((store) => store?.app);

  const { snippet, statistics } = info;

  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  const formattedViewsCount = convertToInternationalCurrencySystem(
    statistics?.viewCount
  );

  const formattedPublishAt = convertToNoOfDaysPosted(publishedAt);

  return (
    <div className={"p-2 m-2 w-96 " + (!store?.isMenuOpen && "w-[20rem]")}>
      <img
        className="rounded-lg w-full "
        alt="thumbnail"
        src={thumbnails?.medium?.url}
      ></img>
      <ul className=" h-32 mt-1">
        <li className="font-bold py-1 ">{title}</li>
        <li className="text-sm">{channelTitle}</li>

        <ul className="flex gap-2 text-sm">
          <li>{formattedViewsCount} views •</li>
          <li> {formattedPublishAt} days</li>
        </ul>
      </ul>
    </div>
  );
};

export default VideoCard;
