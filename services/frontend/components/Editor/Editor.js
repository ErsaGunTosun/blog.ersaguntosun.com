'use client';
import React from 'react'
import MarkdownEditor from "@uiw/react-markdown-editor"

export default function Editor() {
    return (
        <div>Editor</div>
    )
}

export function MarkdownViewer({ content }) {
    return (
        <>
            <MarkdownEditor.Markdown source={content} />
        </>
    )
}
