"use client";
import { Textarea } from "@mui/joy";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { LinkProps } from "@/types";
import createNewLink from "@/app/lib/createNewLink";

export default function NewLinkForm(){
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [linkProp, setLinkProps] = useState<LinkProps>();
    return(
        <>
            <form
                style={{width: "60%", margin: "0 auto"}}
                onSubmit={async (e)=>{
                e.preventDefault();
                const res = await createNewLink(url, alias);
                if (typeof res == 'string' && res === "Invalid URL") {
                    setErrorMessage("Invalid URL, please try again with a new URL");
                } else if (typeof res == 'string' && res === "This alias already exists") {
                    setErrorMessage(res);
                } else if (typeof res !== 'string') {
                    setLinkProps(res);
                    setErrorMessage("");
                }
                }}>
                <TextField
                    variant="filled"
                    sx={{backgroundColor: "white", width: "100%"}}
                    label="https://example.com/very/long/url"
                    value={url}
                    onChange={(e)=> setUrl(e.target.value)}
                />
                <Textarea
                    sx={{
                        padding: "0.5rem",
                        height: "100px",
                        width: "100%",
                        borderRadius: 0,
                    }}
                    variant="soft"
                    placeholder="your-custom-alias"
                    value={alias}
                    onChange={(e)=> setAlias(e.target.value)}
                />
                <div>
                    <Button type="submit" variant="contained" sx={{width: "100%"}}>
                        Shorten
                    </Button>
                </div>
            </form>
            { (errorMessage !== "" || !linkProp)
                ?(
                    <div>{errorMessage}</div>
                )
                :<div>
                    <a href={`${window.location.origin}/${linkProp.alias}`}>{`${window.location.origin}/${linkProp.alias}`}</a>
                </div>
            }
        </>
    )
}