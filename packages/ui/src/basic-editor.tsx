import type { Node, NodeSpec } from "prosemirror-model";
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

const serializeValue = (value: string) => {
  return schema.nodeFromJSON({
    type: "doc",
    content: [
      {
        type: "text",
        text: value,
      },
    ],
  });
};

const deserializeValue = (node: Node) => {
  return node.textContent;
};

const BasicEditor = ({ defaultValue, onChange, onBlur }: BasicEditorProps) => {
  const [state, setState] = useState(
    EditorState.create({
      schema,
      doc: serializeValue(defaultValue),
      plugins: [history(), reactKeys()],
    }),
  );

  const dispatchTransaction = useCallback(
    (tr: Transaction) => {
      setState((prev) => {
        const newState = prev.apply(tr);
        if (!areStatesEqual(prev, newState)) {
          onChange?.(deserializeValue(newState.doc));
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
          onBlur?.(deserializeValue(state.doc));
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
