import getCollection, {LINKS_COLLECTION} from "@/db";
import { ObjectId } from "mongodb";
import { LinkProps } from "@/types";

export default async function getAliasById(
    id: string,
): Promise<LinkProps | null> {
    const postId = ObjectId.createFromHexString(id);

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const data = await linksCollection.findOne({ _id: postId });

    if(data === null){
        return null;
    }

    const url = {
        id: id,
        alias: data.alias,
        url: data.url,
    };

    return url;
}