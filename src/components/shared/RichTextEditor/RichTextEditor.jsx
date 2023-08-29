import {Card, IconButton} from "@/components/common";
import isHotkey from "is-hotkey";
import {
  BoldIcon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Editor, Element as SlateElement, Transforms, createEditor} from "slate";
import {Editable, Slate, useSlate, withReact} from "slate-react";

const defaultValue = [
  {
    type: "paragraph",
    children: [{text: "A line of text in a paragraph."}],
  },
];

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      // eslint-disable-next-line no-nested-ternary
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes < SlateElement > (editor, newProperties);

  if (!isActive && isList) {
    const block = {type: format, children: []};
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const {selection} = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    }),
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({attributes, children, element}) => {
  const style = {textAlign: element.align};
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({attributes, children, leaf}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({format, icon}) => {
  const editor = useSlate();
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
  );

  return (
    <IconButton
      type="button"
      size="xs"
      variant={isActive ? "main" : "alternate"}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}>
      {icon}
    </IconButton>
  );
};

const MarkButton = ({format, icon}) => {
  const editor = useSlate();
  return (
    <IconButton
      type="button"
      variant={isMarkActive(editor, format) ? "main" : "alternate"}
      size="xs"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}>
      {icon}
    </IconButton>
  );
};

export default function RichTextEditor({initialValue, onChange}) {
  const [editor] = useState(() => withReact(createEditor()));

  useEffect(
    () => {
      editor.children = initialValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialValue],
  );

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // const initialValue = useMemo(() => {
  //   if (typeof window === "undefined") return defaultValue;

  //   return (
  //     value || [
  //       {
  //         type: "paragraph",
  //         children: [{text: "A line of text in a paragraph."}],
  //       },
  //     ]
  //   );
  // }, [value]);

  const editorRenderer = () => {
    if (!mounted) return null;

    return (
      <div className="relative">
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={onChange}
          // onChange={(value) => {
          // const isAstChange = editor.operations.some(
          //   (op) => "set_selection" !== op.type,
          // );
          // if (isAstChange) {
          //   // Save the value to Local Storage.
          //   const content = JSON.stringify(value);
          //   localStorage.setItem("content", content);
          // }
          // }}
        >
          <div className="absolute top-0 left-0 right-0 z-20 pt-4 bg-white">
            <div className="flex gap-2">
              <MarkButton format="bold" icon={<BoldIcon size={14} />} />
              <MarkButton format="italic" icon={<ItalicIcon size={14} />} />
              <MarkButton
                format="underline"
                icon={<UnderlineIcon size={14} />}
              />
              <BlockButton
                format="heading-two"
                icon={<Heading2Icon size={14} />}
              />
              <BlockButton
                format="heading-three"
                icon={<Heading3Icon size={14} />}
              />

              <BlockButton
                format="numbered-list"
                icon={<ListOrderedIcon size={14} />}
              />

              <BlockButton
                format="bulleted-list"
                icon={<ListIcon size={14} />}
              />

              <BlockButton
                format="block-quote"
                icon={<QuoteIcon size={14} />}
              />
            </div>

            <div className="my-1 -mx-4 divider"></div>
          </div>

          <div className="h-16"></div>
          <div className="overflow-auto max-h-[500px]">
            <Editable
              className="p-1 min-h-[300px] mb-2"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
          </div>
        </Slate>
      </div>
    );
  };

  return (
    <>
      <Card className="pt-0 post-container">
        {editorRenderer()}

        {/* <Slate editor={editor} initialValue={initialValue} /> */}
      </Card>
    </>
  );
}
