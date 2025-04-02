import type { DOMOutputSpec, NodeSpec } from "prosemirror-model";
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

const pDOM: DOMOutputSpec = ["p", 0];

const schema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    } as NodeSpec,
    /// A plain paragraph textblock. Represented in the DOM
    /// as a `<p>` element.
    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return pDOM;
      },
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
  value: any | undefined;
  onChange: (value: any) => void;
  onBlur?: () => void;
}

const BasicEditor = ({ value, onChange, onBlur }: BasicEditorProps) => {
  const [state, setState] = useState(
    EditorState.create({
      schema,
      doc: value ? schema.nodeFromJSON(value) : undefined,
      plugins: [history(), reactKeys()],
    }),
  );

  const dispatchTransaction = useCallback(
    (tr: Transaction) => {
      setState((prev) => {
        const newState = prev.apply(tr);
        if (!prev.doc.eq(newState.doc)) {
          onChange(newState.doc.toJSON());
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
          onBlur?.();
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
