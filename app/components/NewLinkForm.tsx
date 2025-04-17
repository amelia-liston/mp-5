"use client";
import { Textarea } from "@mui/joy";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { LinkProps } from "@/types";
import createNewLink from "@/app/lib/createNewLink";

export default function NewLinkForm(){
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    return(
        <>
            <form onSubmit={(e)=>{
                e.preventDefault();
                createNewLink(url, alias)
                    .catch((err)=>console.log(err));
            }}>
                <TextField
                    variant="filled"
                    sx={{backgroundColor: "white", width: "100%"}}
                    label="Title"
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
                    placeholder="Content"
                    value={alias}
                    onChange={(e)=> setAlias(e.target.value)}
                />
                <FormHelperText>What&apos;s on your mind?</FormHelperText>
                <div>
                    <Button type="submit" variant="contained" sx={{width: "80px"}}>
                        Create
                    </Button>
                </div>
            </form>
        </>
    )
}