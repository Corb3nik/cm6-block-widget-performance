import { EditorView,  lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import doc from "./file.html?raw";
import { html } from "@codemirror/lang-html";
import { field } from "./decoration";

const extensions = () => {
  return [
    EditorState.lineSeparator.of("\r\n"),
    lineNumbers(),
    html(),
    field,
    EditorView.theme({
      "&": {
        "height":"500px"
      },
      ".cm-scroller": {
        "overflow":"auto",
        "background-color": "white"
      }
    }),

  ]
}

const app = document.getElementById("app");
const editor = new EditorView({
  parent: app,
  doc,
  extensions: extensions(),
});
