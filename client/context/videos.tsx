import { Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "react-query";
import { getVideos } from "../api";
import { QueryKeys, Video } from "../types";

const VideoContext = createContext<{
    videos: Video[],
    refetch: <TpageData>(
        option?: (RefetchOptions & RefetchQueryFilters<TpageData>) |
        undefined
    ) => any;
    // @ts-ignore
}>(null);

function VideosContextProvider({children}:{children: ReactNode}){


    const { data, isLoading, refetch } = useQuery(QueryKeys.videos, getVideos)

    return (
        <VideoContext.Provider
            value={{
                videos: data,
                refetch,
            }}
        >
        {isLoading ? <Loader/> : children}
        </VideoContext.Provider>
    );
}

const useVideo = () => useContext(VideoContext);

export { VideosContextProvider, useVideo };