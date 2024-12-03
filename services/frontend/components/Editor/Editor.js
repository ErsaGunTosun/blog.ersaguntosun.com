'use client';
import React from 'react'
import MarkdownEditor from "@uiw/react-markdown-editor"

export default function Editor({mdStr, handleEditorChange}) {
    const editorRef = React.useRef(null)
    return (
        <>
            <MarkdownEditor
                ref={editorRef}
                className='w-full h-full max-h-full bg-white'
                visible={true}
                enablePreview={true}
                value={mdStr}
                enableScroll={true}
                onChange={(value, viewUpdate) => handleEditorChange(value, viewUpdate)}
            />
        </>
    )
}

export function MarkdownViewer({ content }) {
    return (
        <>
            <MarkdownEditor.Markdown source={content} />
        </>
    )
}
