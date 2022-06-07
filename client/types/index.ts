export interface Video{
    _id: string;
    owner: string;
    published: string;
    videoId: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    extension: string;
    description: string;
    title: string;
}

export enum QueryKeys {
    me = "me",
    videos = "videos",
}

export interface Me {
    _id: string;
    email: string;
    username: string;
}