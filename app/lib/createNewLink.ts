"use server";
import { LinkProps } from "@/types";
import getCollection, {LINKS_COLLECTION} from "@/db";

export default async function createNewLink(
    url: string,
    alias: string,
): Promise<LinkProps> {
    console.log("Creating new link...");
    const u = {
        url: url,
        alias: alias,
    };
    //insert into db
    const linksCollection = await getCollection(LINKS_COLLECTION);
    const res = await linksCollection.insertOne({...u});

    if(!res.acknowledged){
        throw new Error("DB insert failed");
    }


    return {...u, id: res.insertedId.toHexString()};
}