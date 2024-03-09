import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { YT_VIDEO_DETAIL_API } from "../utils/constants";
import {
  convertToInternationalCurrencySystem,
  convertToNoOfDaysPosted,
} from "../utils/helper";

const WatchPage = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const [videoDetail, setVideoDetail] = useState([]);

  const getVideoDetails = async () => {
    const data = await fetch(
      `${YT_VIDEO_DETAIL_API}  &id=${searchParams.get("v")}`
    );
    const json = await data.json();
    console.log(data);
    console.log("vid detail", json);
    setVideoDetail(json?.items[0]);
  };

  const statistics = videoDetail?.statistics;
  const snippet = videoDetail?.snippet;

  const formattedLikeCount = convertToInternationalCurrencySystem(
    statistics?.likeCount
  );
  const formattedViewsCount = convertToInternationalCurrencySystem(
    statistics?.viewCount
  );
  const formattedPublishAt = convertToNoOfDaysPosted(snippet?.publishedAt);

  useEffect(() => {
    dispatch(closeMenu());
    getVideoDetails();
  }, []);

  return (
    <div className="felx flex-col w-full">
      <div className="px-5 flex  ">
        <div>
          <iframe
            width="980"
            height="540"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full">
          <LiveChat />
        </div>
      </div>

      {/* video stastics */}
      <div className="px-5  flex w-full">
        {/*  left side -> titles etc */}
        <div className=" w-6/12">
          <h1 className="text-2xl font-bold ">{snippet?.title}</h1>
          {/*  channel title && subscribe btn */}
          <div className="flex gap-4 py-4">
            <h1 className="font-bold opacity-80 ">{snippet?.channelTitle}</h1>
            <button className="bg-slate-900 text-white px-4 py-2  text-sm font-bold rounded-full ">
              Subscribe
            </button>
          </div>
          {/*  views */}
          <div className="font-bold flex gap-4">
            <h1>{formattedViewsCount} views</h1>
            {formattedPublishAt === 1 ? (
              <h1>{formattedPublishAt} Day ago</h1>
            ) : (
              <h1>{formattedPublishAt} Days ago</h1>
            )}
          </div>
        </div>
        {/*  right side -> like btns  etc */}
        <div className=" w-3/12 flex justify-between">
          {/*  like btn */}
          <div className="w-32 flex ">
            <h1 className="py-2 h-12 px-4   bg-slate-100 rounded-full">
              {formattedLikeCount}
            </h1>
            <img
              className="w-32 h-32  relative -top-10 -left-10 -z-10"
              alt="logo"
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQBjyN0MX2CdioDfEOIgFIYMhEEjCfIU_TBMMIbCABb_kyk2AAm"
            ></img>
          </div>
          {/*  dislike btn */}
          <div className="w-32 flex relative -top-10 -left-24  ">
            <img
              className="w-32 h-32 rotate-180"
              alt="logo"
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQBjyN0MX2CdioDfEOIgFIYMhEEjCfIU_TBMMIbCABb_kyk2AAm"
            ></img>
          </div>
        </div>
      </div>

      <CommentsContainer commentCount={statistics?.commentCount} />
    </div>
  );
};

export default WatchPage;
