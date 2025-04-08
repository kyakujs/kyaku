import type { Schema } from "prosemirror-model";
import type { EditorState } from "prosemirror-state";

interface IsStateEqualOptions {
  /**
   * Whether to compare the selection of the two states.
   *
   * @defaultValue false
   */
  checkSelection?: boolean;
}

/**
 * Check if two states are equal.
 */
export function areStatesEqual(
  stateA: EditorState,
  stateB: EditorState,
  options: IsStateEqualOptions = {},
): boolean {
  // The states are identical, so they're equal.
  if (stateA === stateB) {
    return true;
  }

  // If the content is different then, no, not equal.
  if (!stateA.doc.eq(stateB.doc)) {
    return false;
  }

  // If we care about selection and selection is not the same, then not equal.
  if (options.checkSelection && !stateA.selection.eq(stateB.selection)) {
    return false;
  }

  // If the schema are not compatible then no, not equal.
  if (!areSchemasCompatible(stateA.schema, stateB.schema)) {
    return false;
  }

  return true;
}

/**
 * Check that the nodes and marks present on `schemaA` are also present on
 * `schemaB`.
 */
export function areSchemasCompatible(
  schemaA: Schema,
  schemaB: Schema,
): boolean {
  if (schemaA === schemaB) {
    return true;
  }

  const marksA = Object.keys(schemaA.marks);
  const marksB = Object.keys(schemaB.marks);
  const nodesA = Object.keys(schemaA.nodes);
  const nodesB = Object.keys(schemaB.nodes);

  if (marksA.length !== marksB.length || nodesA.length !== nodesB.length) {
    return false;
  }

  for (const mark of marksA) {
    // No reverse check needed since we know the keys are unique and the lengths
    // are identical.
    if (!marksB.includes(mark)) {
      return false;
    }
  }

  for (const node of nodesA) {
    // No reverse check needed since we know the keys are unique and the lengths
    // are identical.
    if (!nodesB.includes(node)) {
      return false;
    }
  }

  return true;
}
