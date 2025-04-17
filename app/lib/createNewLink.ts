"use server";
import { LinkProps } from "@/types";
import getCollection, {LINKS_COLLECTION} from "@/db";

export default async function createNewLink(
    url: string,
    alias: string,
): Promise<LinkProps> {
    console.log("Creating new post...");
    const p = {
        url: url,
        alias: alias,
    };
    //insert into db
    const postsCollection = await getCollection(LINKS_COLLECTION);
    const res = await postsCollection.insertOne({...p});

    if(!res.acknowledged){
        throw new Error("DB insert failed");
    }


    return {...p, alias: res.insertedId.toHexString()};//likely need to fix
}