"use client"

import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CodeEditorProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = 'javascript',
  title = 'Code Editor',
  description = 'Generated code',
  readOnly = true,
  onChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Initialize Monaco editor
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value: code,
        language: language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        readOnly: readOnly,
        fontSize: 14,
        lineNumbers: 'on',
        wordWrap: 'on',
        folding: true,
        lineDecorationsWidth: 10,
        formatOnPaste: true,
        formatOnType: true,
        tabSize: 2,
      });

      // Set up change event
      if (onChange) {
        monacoEditorRef.current.onDidChangeModelContent(() => {
          onChange(monacoEditorRef.current?.getValue() || '');
        });
      }

      // Format document
      setTimeout(() => {
        monacoEditorRef.current?.getAction('editor.action.formatDocument')?.run();
      }, 300);
    }

    return () => {
      monacoEditorRef.current?.dispose();
    };
  }, [code, language, readOnly, onChange]);

  // Update editor content when code prop changes
  useEffect(() => {
    if (monacoEditorRef.current && code !== monacoEditorRef.current.getValue()) {
      monacoEditorRef.current.setValue(code);
      // Format document after setting new value
      setTimeout(() => {
        monacoEditorRef.current?.getAction('editor.action.formatDocument')?.run();
      }, 300);
    }
  }, [code]);

  return (
    <Card className="w-full">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={editorRef} 
          className="w-full h-[500px] border-0 rounded-b-lg overflow-hidden"
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;