import getCollection, {LINKS_COLLECTION} from "@/db";
import { LinkProps } from "@/types";

export default async function getAliasById(
    alias: string,
): Promise<LinkProps | null> {

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const data = await linksCollection.findOne({ alias: alias });

    if(data === null){
        return null;
    }

    const hexId = data._id.toHexString();

    const url = {
        id: hexId,
        alias: data.alias,
        url: data.url,
    };

    return url;
}