import React, { useRef, useState } from 'react';
import Editor from './editor';
import Quill from "quill";
import "quill/dist/quill.core.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import { useForm } from "react-hook-form";

const Delta = Quill.import('delta');

const App = () => {
    const [htmlGe, setHTMLge] = useState('');
    const [htmlEn, setHTMLen] = useState('');
    const [imageLink, setImageLink] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const quillRefGe = useRef();
    const quillRefEn = useRef();

    const addPost = async (data) => {
        try {
            const timestamp = new Date();
            const formattedDate = timestamp.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            const imgLink = imageLink || 'https://a-innovations.org/AI.png';
            await addDoc(collection(db, "posts"), {
                text_ka: htmlGe,
                text_en: htmlEn,
                img_url: imgLink,
                title_en: data.title_en,
                title_ka: data.title_ka,
                timestamp: formattedDate,
                timestamp_sort: timestamp.getTime()
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            <a href="https://a-innovations.org/" target={'_blank'}><img src="logo.svg" alt="" className="aiia-logo"/></a>
            <div className="add-post">
                <form onSubmit={handleSubmit(addPost)}>
                    <h1>Add a post</h1>
                    <br/>
                    <TextField
                        label="Title in Georgian"
                        variant="outlined"
                        style={{width: "100%"}}
                        {...register("title_ka", {required: "This field is required"})}
                        error={!!errors.title_ka}
                        helperText={errors.title_ka ? errors.title_ka.message : ''}
                    />
                    <br/>
                    <br/>
                    <TextField
                        label="Title in English"
                        variant="outlined"
                        style={{width: "100%"}}
                        {...register("title_en", {required: "This field is required"})}
                        error={!!errors.title_en}
                        helperText={errors.title_en ? errors.title_en.message : ''}
                    />
                    <br/>
                    <p style={{textAlign: "left"}}>Text in GEORGIAN</p>
                    <Editor
                        ref={quillRefGe}
                        defaultValue={new Delta()
                            .insert('Hello')
                            .insert('\n', {header: 1})
                            .insert('Some ')
                            .insert('initial', {bold: true})
                            .insert(' ')
                            .insert('content', {underline: true})
                            .insert('\n')}
                        getSemanticHTML={setHTMLge}
                    />
                    <p style={{textAlign: "left"}}>Text in ENGLISH</p>
                    <Editor
                        ref={quillRefEn}
                        defaultValue={new Delta()
                            .insert('Hello')
                            .insert('\n', {header: 1})
                            .insert('Some ')
                            .insert('initial', {bold: true})
                            .insert(' ')
                            .insert('content', {underline: true})
                            .insert('\n')}
                        getSemanticHTML={setHTMLen}
                    />
                    <p style={{textAlign: "left"}}>
                        Link of the image (please use <a href="https://postimages.org/" target={'_blank'}>postimages.org</a> <i>Direct link</i> option after uploading)
                    </p>
                    <TextField
                        label="Image Link"
                        variant="outlined"
                        style={{width: "100%"}}
                        onChange={(e) => setImageLink(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <Button variant="outlined" style={{width: "100%"}} type="submit">
                        Add Post
                    </Button>
                </form>
            </div>
            <br/>
            <br/>
            <div className="footer">
                <p className="company">N(N)LE Association of Innovations</p>
                <p className="rights">All rights reserved © {new Date().getFullYear()}</p>
            </div>
        </>
    );
};

export default App;