import { redirect } from "next/navigation";
import getAliasById from "@/app/lib/getAliasById";

export default async function NewUrlPage({ params,}:{
    params: Promise<{id: string}>;
}) {
    const { id } = await params;
    let redirectLink = "";
    console.log(id);

    try{
        const alias = await getAliasById(id);
        if(!alias){
            redirect(`/error`);
        }
        redirectLink = "${alias}";
    } catch(err){
        console.error(err);
        return redirect("/");
    }
    return redirect(`/${redirectLink}`)
}