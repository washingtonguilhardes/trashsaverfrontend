import React, { useMemo, useState } from 'react';
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone';
import { MdDelete } from 'react-icons/md';

import styled from '@emotion/styled';
import { FileObject, FileObjectService } from '@src/services/file-object.service';
import clsx from 'clsx';

import Grow from '@mui/material/Grow';
import Button from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';

import { notify, dismiss } from '../alert';

const Container = styled.div<{ preview?: boolean }>``;
const Dropzone = styled.div``;
const FilePreviewContainer = styled.div`
  margin: 16px 0;
`;
const FilePreviewItem = styled.div<{ src?: string }>`
  width: 200px;
  height: 200px;
  width: 200px;
  height: 200px;
  background: url(${({ src }) => src}), #ccc;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 8px;
  padding: 8px;
`;

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    borderWidth: 3,
    borderRadius: 7,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#a7a7a7',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
  },
  focusedStyle: {
    borderColor: '#2196f3',
    backgroundColor: 'rgba(33, 149, 243, 0.18)',
    color: '#2196f3',
  },
  rejectStyle: {
    borderColor: '#ff1744',
  },
  acceptStyle: {
    borderColor: '#00e676',
  },
});

type IFile = File & { path?: string };

interface Props {
  uploaderService: FileObjectService;
  previewEnable?: boolean;
  disabled?: boolean;
  files?: FileObject[];
  onUploadEnd?: (files: FileObject[]) => void;
  onDelete?: (files: FileObject[]) => void;
}

async function* uploadFiles(service: FileObjectService, files: IFile[]) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const form = new FormData();
    form.append('file', file);

    yield await service.upload(form);
  }
}
export function FileUploaderDnd(props: Props) {
  const {
    files = [],
    previewEnable,
    uploaderService,
    disabled,
    onDelete,
    onUploadEnd,
  } = props;

  const [sending, setSending] = useState(false);

  const onDropAccepted = async (files: IFile[] = []) => {
    setSending(true);
    dismiss();
    try {
      const fileObject: FileObject[] = [];
      for await (const file of uploadFiles(uploaderService, files)) {
        fileObject.push(file);
      }
      notify({ message: 'Arquivo enviado', type: 'success' });
      if (onUploadEnd) onUploadEnd(fileObject);
      setSending(false);
    } catch {
      setSending(false);
      notify({ message: 'Arquivo não enviado', type: 'error' });
    }
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDropAccepted, accept: 'image/*', disabled: disabled ?? sending });
  const classes = useStyles();

  const className = useMemo(
    () =>
      clsx([
        classes.root,
        isFocused && classes.focusedStyle,
        isDragAccept && classes.acceptStyle,
        isDragReject && classes.rejectStyle,
      ]),
    [classes, isFocused, isDragAccept, isDragReject]
  );

  return (
    <Container preview={previewEnable}>
      <Dropzone {...getRootProps({ className })}>
        <input {...getInputProps()} />
        <p>Arraste e solte o arquivo, ou click para selecionar</p>
      </Dropzone>
      {sending && <LinearProgress />}
      <Grow in={previewEnable && files.length > 0}>
        {previewEnable && (
          <FilePreviewContainer>
            {files.map(file => (
              <FilePreviewItem key={file.id} src={uploaderService.getSrc(file.id)}>
                {onDelete && !disabled && (
                  <Button
                    onClick={() => onDelete(files.filter(f => f.id !== file.id))}
                    sx={{ bgcolor: '#fff !important' }}
                    color="primary"
                  >
                    <MdDelete />
                  </Button>
                )}
              </FilePreviewItem>
            ))}
          </FilePreviewContainer>
        )}
      </Grow>
    </Container>
  );
}
