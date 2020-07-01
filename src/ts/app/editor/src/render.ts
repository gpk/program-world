import {html} from "lit-html"
import CodeMirror from "codemirror"
import {ShadowRootContext} from "app/framework"
import {codeMirrorCss} from "./codemirror-css"
import {Subtree} from "./subtree"

interface RenderCodeEditorResult {
    editor?: CodeMirror.Editor
}

export function render(subtree: Subtree,
                       domContext: ShadowRootContext,
                       lastResult: RenderCodeEditorResult): RenderCodeEditorResult {

    let result: RenderCodeEditorResult = lastResult

    if (!lastResult.editor) {
        domContext.render(
            html`
                <style>
                
                ${codeMirrorCss}
                                
                .editor {
                    width: 100%;
                    overflow: hidden;
                }
                </style>
                <div class="editor"></div>
            `)

        const editor = CodeMirror(domContext.find(".editor"))

        result = {editor: editor}
    }

    if (subtree.nextContent.setOnCounter == subtree.updateCounter) {
        result.editor!.getDoc().setValue(subtree.nextContent.document.content)
    }

    return result
}
