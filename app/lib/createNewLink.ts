"use server";
import { LinkProps } from "@/types";
import getCollection, {LINKS_COLLECTION} from "@/db";

export default async function createNewLink(
    url: string,
    alias: string,
): Promise<LinkProps | string> {
    console.log("Creating new link...");
    const u = {
        url: url,
        alias: alias,
    };
    const urlRes = await fetch(url);
    if (!urlRes.ok) {
        //throw new Error(`Response status: ${urlRes.status}`);
        return "Invalid URL";
    } else if (urlRes.status >= 400) {
        return "Invalid URL";
    }

    //insert into db
    const linksCollection = await getCollection(LINKS_COLLECTION);

    //check if alias exists already
    const doesAliasExist = await linksCollection.findOne({alias});
    if (doesAliasExist) {
        return "This alias already exists";
    }

    const res = await linksCollection.insertOne({...u});

    if(!res.acknowledged){
        throw new Error("DB insert failed");
    }

    return {...u, id: res.insertedId.toHexString()};
}