import {WidgetType} from "@codemirror/view";

import { syntaxTree } from "@codemirror/language";
import type { EditorState } from "@codemirror/state";
import { RangeSetBuilder, StateField } from "@codemirror/state";
import type { DecorationSet } from "@codemirror/view";
import { Decoration, EditorView } from "@codemirror/view";



export class NewlineWidget extends WidgetType {
  toDOM() {
    const div = document.createElement("div");
    div.classList.add("c-newline-widget");
    return div;
  }
}

const getDecorations = (state: EditorState) => {
  const tree = syntaxTree(state);

  const builder = new RangeSetBuilder<Decoration>();
  tree.iterate({
    enter: ({ node, type }) => {

      if (type.name === "}") {
        const widget = new NewlineWidget();
        builder.add(node.from, node.to, Decoration.widget({
          widget,
          block: true,
          inlineOrder: true,
        }));
      }
    }
  })

  const decorations = builder.finish();

  return decorations;
};

export const field = StateField.define<DecorationSet>({
  create(state) {
    return getDecorations(state);
  },
  update(value, tr) {
    if (tr.docChanged) {
      return getDecorations(tr.state);
    }

    return value.map(tr.changes);
  },
  provide: (f) => EditorView.decorations.from(f),
});
