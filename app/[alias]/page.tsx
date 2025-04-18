import { redirect } from "next/navigation";
import getAliasById from "@/app/lib/getAliasById";

export default async function NewUrlPage({ params,}:{
    params: Promise<{alias: string}>;
}) {
    const { alias } = await params;
    let redirectLink = "/";
    console.log(alias);

    try{
        const prevAlias = await getAliasById(alias);
        if(!prevAlias){
            redirectLink = "/error";
        } else {
            redirectLink = prevAlias.url;
        }
    } catch(err){
        console.error(err);
        redirectLink = "/";
    }
    return redirect(redirectLink);
}