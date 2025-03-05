'use client'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import TextAlign from '@tiptap/extension-text-align'
import { useEditor, EditorContent } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import '@/app/ui/styles/tiptap-base.css'
import {
    Heading1,
    Heading2,
    Heading3,
    Code,
    CodeSquare,
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    Text,
    Upload,
    ListOrdered,
    ListCollapse,
    TextQuote,
    FlipVertical,
    Undo,
    Redo,
    AlignLeft,
    AlignRight,
    AlignCenter,
    AlignJustify,
} from 'lucide-react'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null
    }

    const addImage = () => {
        const url = window.prompt("Paste image URL");

        if (url) {
            editor.chain().focus().setImage({
                src: url, alt: "Lorem Alt", title: "Lorem Title"
            }).run();
        }
    }

    return (
        <div className="tiptap-control-group">
            <div className="button-group">
                <button type='button'
                    title='Bold' aria-label='Bold'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <Bold />
                </button>
                <button type='button'
                    title='Italic' aria-label='Italic'
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <Italic />
                </button>
                <button type='button'
                    title='Underline' aria-label='Underline'
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                    <UnderlineIcon />
                </button>
                <button type='button'
                    title='Strike text' aria-label='Strike text'
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <Strikethrough />
                </button>
                <button type='button'
                    title='Align Left' aria-label='Align Left'
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                    <AlignLeft />
                </button>
                <button type='button'
                    title='Align Center' aria-label='Align Center'
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                    <AlignCenter />
                </button>
                <button type='button'
                    title='Align Right' aria-label='Align Right'
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                    <AlignRight />
                </button>
                <button type='button'
                    title='Align Justify' aria-label='Align Justify'
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                >
                    <AlignJustify />
                </button>
                <button type='button'
                    title='Clear marks' aria-label='Clear marks'
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                >
                    Clear marks
                </button>
                <button type='button'
                    title='Clear nodes' aria-label='Clear nodes'
                    onClick={() => editor.chain().focus().clearNodes().run()}
                >
                    Clear nodes
                </button>
                <button type='button'
                    title='Paragraph' aria-label='Paragraph'
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    <Text />
                </button>
                <button type='button'
                    title='H1' aria-label='H1'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    <Heading1 />
                </button>
                <button type='button'
                    title='H2' aria-label='H2'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <Heading2 />
                </button>
                <button type='button'
                    title='H3' aria-label='H3'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    <Heading3 />
                </button>
                <button type='button'
                    title='Bullet List' aria-label='Bullet List'
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <ListCollapse />
                </button>
                <button type='button'
                    title='Ordered List' aria-label='Ordered List'
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <ListOrdered />
                </button>
                <button type='button'
                    title='Inline Code' aria-label='Inline Code'
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    <Code />
                </button>
                <button type='button'
                    title='Code Block' aria-label='Code Block'
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    <CodeSquare />
                </button>
                <button type='button'
                    title='Block Quote' aria-label='Block Quote'
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    <TextQuote />
                </button>
                <button type='button'
                    title='Horizontal Rule' aria-label='Horizontal Rule'
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <FlipVertical />
                </button>
                <button type='button'
                    title='Line Break' aria-label='Line Break'
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                >
                    Hard break
                </button>
                <button type='button'
                    title='Undo' aria-label='Undo'
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    <Undo />
                </button>
                <button type='button'
                    title='Redo' aria-label='Redo'
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    <Redo />
                </button>
                <button type='button'
                    title='Set Purple color' aria-label='Set Purple color'
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                >
                    Purple
                </button>
                <button type='button'
                    title='Add Image via URL' aria-label='Add Image via URL'
                    onClick={() => addImage()}
                    className={editor.isActive('image') ? 'is-active' : ''}
                >
                    <Upload />
                </button>
            </div>
        </div>
    )
}



const TiptapRichTextEditor = ({ content, updateContent }: { content: string, updateContent: (value: string) => void }) => {

    const editor = useEditor({
        extensions: [
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle,
            Underline,
            Image,
            ImageResize,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            })
        ],
        content: content,
        // prevent loading the default CSS (which isn't much anyway)        
        injectCSS: false,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            updateContent(editor.getHTML());
        }
    })

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    )
}

export default TiptapRichTextEditor
