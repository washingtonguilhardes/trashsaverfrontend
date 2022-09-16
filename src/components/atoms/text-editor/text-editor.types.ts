import React, { RefAttributes } from 'react';

export interface TextEditorProps {
  htmlInitalValue?: string;
  onChange: (htmlValue: string) => void;
  error?: string;
  disabled?: boolean;
}

export type TextEditorComponent = React.FC<TextEditorProps & RefAttributes<unknown>>;
