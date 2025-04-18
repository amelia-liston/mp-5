"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { LinkProps } from "@/types";
import createNewLink from "@/app/lib/createNewLink";
import Container from '@mui/material/Container';

export default function NewLinkForm(){
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [linkProp, setLinkProps] = useState<LinkProps>();
    return(
        <>
            <Container maxWidth="md" className="bg-white drop-shadow-2xl rounded-xl mb-10">
                <form
                    style={{width: "90%", margin: "0 auto"}}
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
                    <h2 className="text-xl mt-6 mb-2">URL</h2>
                    <TextField
                        variant="filled"
                        sx={{backgroundColor: "white", width: "100%"}}
                        label="https://example.com/very/long/url"
                        value={url}
                        onChange={(e)=> setUrl(e.target.value)}
                    />
                    <h2 className="text-xl mt-2 mb-2">Custom Alias</h2>
                    <TextField
                        variant="filled"
                        sx={{backgroundColor: "white", width: "100%"}}
                        label="your-custom-alias"
                        value={alias}
                        onChange={(e)=> setAlias(e.target.value)}
                    />
                    <div className="mt-6 mb-6">
                        <Button type="submit" variant="contained" sx={{width: "100%", backgroundColor: "purple"}}>
                            Shorten
                        </Button>
                    </div>
                </form>
                <div className="flex justify-center mb-4">
                    { (errorMessage !== "" || !linkProp)
                        ?(
                            <div className="text-2xl text-red-700 font-bold">{errorMessage}</div>
                        )
                        :<div  className="text-2xl text-black">
                            <a href={`${window.location.origin}/${linkProp.alias}`}>Your new url: <b>{`${window.location.origin}/${linkProp.alias}`}</b></a>
                        </div>
                    }
                </div>

            </Container>
        </>
    )
}