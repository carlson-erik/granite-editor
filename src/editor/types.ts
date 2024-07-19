import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

/* -------- BaseElement Types -------- */
export type HeaderElementType =
  | "header-one"
  | "header-two"
  | "header-three"
  | "header-four"
  | "header-five"
  | "header-six";

export type ListElementType = "ordered-list" | "bulleted-list";

export type InlineElementType = "link";

export type TextElementType = "paragraph" | "block-quote" | HeaderElementType;

export type ElementType =
  | TextElementType
  | ListElementType
  | "list-item"
  | InlineElementType;

/* -------- Formats -------- */
export type Alignment = "left" | "right" | "center" | "justify";

export type ElementFormat = "align";

export type TextFormat =
  | "bold"
  | "italics"
  | "underline"
  | "strikethrough"
  | "textcolor";

/* -------- Leaves -------- */
export interface TextLeaf {
  text: string;
  bold?: true;
  italics?: true;
  underline?: true;
  strikethrough?: true;
  textcolor?: string;
}

/* -------- Elements -------- */
export type InlineElement = TextLeaf | LinkInlineElement;

export interface BaseElement {
  type: ElementType;
}

export interface ParagraphElement extends BaseElement {
  type: "paragraph";
  align: Alignment;
  children: InlineElement[];
}

export interface BlockQuoteElement extends BaseElement {
  type: "block-quote";
  children: InlineElement[];
}

export interface HeaderElement extends BaseElement {
  type: HeaderElementType;
  align: Alignment;
  children: InlineElement[];
}

export interface ListItemElement extends BaseElement {
  type: "list-item";
  children: InlineElement[];
}

export interface ListElement extends BaseElement {
  type: ListElementType;
  children: (ListElement | ListItemElement)[];
}

export interface LinkInlineElement extends BaseElement {
  type: InlineElementType;
  url: string;
  children: InlineElement[];
}

export type TextElement = ParagraphElement | BlockQuoteElement | HeaderElement;

export type EditorElement =
  | TextElement
  | ListElement
  | ListItemElement
  | LinkInlineElement;

/* -------- Editor -------- */
export type ReactTextEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: ReactTextEditor;
    BaseElement: EditorElement;
    Text: TextLeaf;
  }
}
