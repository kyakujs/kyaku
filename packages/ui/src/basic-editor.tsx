import type { NodeSpec } from "prosemirror-model";
import type { Transaction } from "prosemirror-state";
import { useCallback, useState } from "react";
import {
  ProseMirror,
  ProseMirrorDoc,
  reactKeys,
} from "@handlewithcare/react-prosemirror";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

import { areStatesEqual } from "./utils/prosemirror";

const schema = new Schema({
  nodes: {
    doc: {
      content: "inline*",
    } as NodeSpec,
    text: {
      group: "inline",
    } as NodeSpec,
  },
});

const plugins = [
  keymap({
    "Mod-z": undo,
    "Mod-y": redo,
  }),
];

export interface BasicEditorProps {
  defaultValue: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

const BasicEditor = ({ defaultValue, onChange, onBlur }: BasicEditorProps) => {
  const [state, setState] = useState(
    EditorState.create({
      schema,
      doc: schema.nodeFromJSON({
        type: "doc",
        content: [
          {
            type: "text",
            text: defaultValue,
          },
        ],
      }),
      plugins: [history(), reactKeys()],
    }),
  );

  const dispatchTransaction = useCallback(
    (tr: Transaction) => {
      setState((prev) => {
        const newState = prev.apply(tr);
        if (!areStatesEqual(prev, newState)) {
          onChange?.(newState.doc.textContent);
        }
        return newState;
      });
    },
    [onChange],
  );

  return (
    <ProseMirror
      state={state}
      dispatchTransaction={dispatchTransaction}
      handleDOMEvents={{
        blur: (_, __) => {
          onBlur?.(state.doc.textContent);
        },
      }}
      plugins={plugins}
    >
      <ProseMirrorDoc spellCheck={true} translate="no" />
    </ProseMirror>
  );
};
BasicEditor.displayName = "BasicEditor";

export { BasicEditor };
