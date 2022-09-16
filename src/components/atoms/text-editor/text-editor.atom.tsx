import { forwardRef, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import FormHelperText from '@mui/material/FormHelperText';

import { TextEditorProps } from './text-editor.types';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextEditorComponent(props: TextEditorProps) {
  const { htmlInitalValue, error, onChange, disabled } = props;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (nextEditorState: EditorState) => {
    setEditorState(nextEditorState);
    const html = draftToHtml(convertToRaw(nextEditorState.getCurrentContent()));
    if (onChange) {
      onChange(html);
    }
  };

  useEffect(() => {
    const contentBlock = htmlToDraft(htmlInitalValue ?? '');
    const rawHtml = convertToRaw(editorState.getCurrentContent());
    const doc = new DOMParser().parseFromString(htmlInitalValue ?? '', 'text/html');
    if (
      htmlInitalValue &&
      doc.body.textContent?.replace(/(\n)|(\r)/gi, '').length > 0 &&
      contentBlock &&
      rawHtml.blocks.length < 2 &&
      !rawHtml.blocks[0]?.text
    ) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(contentBlock.contentBlocks)
        )
      );
    }
  }, [editorState, htmlInitalValue]);

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        placeholder="Digite o conteúdo"
        readOnly={disabled}
      />
      <FormHelperText error>{error ?? ' '}</FormHelperText>
    </>
  );
}

export const TextEditor = forwardRef(TextEditorComponent);
