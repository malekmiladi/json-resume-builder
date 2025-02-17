"use client";

import { useState } from "react";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import IconCheck from "@/app/components/editing-panel/icons/icon-check";
import IconDragVertical from "@/app/components/editing-panel/icons/icon-drag-vertical";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface TitleProps {
  title: string;
  updateTitle: (title: string) => void;
  dragProps?: {
    attributes: DraggableAttributes,
    listeners: SyntheticListenerMap | undefined
  };
}

function ChangeableTitle({ title, updateTitle, dragProps }: TitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const {attributes, listeners} = dragProps ?? {attributes: null, listeners: null};
  return (
    <div className="w-full">
      {isEditing ? (
        <h1
          className={
            "text-lg font-bold tracking-tight text-(--foreground-primary) flex items-center gap-2"
          }
        >
          {dragProps && (
            <div className={"text-(--foreground-primary) cursor-pointer"} {...attributes} {...listeners}>
              <IconDragVertical size={20} />
            </div>
          )}
          <input
            type={"text"}
            value={newTitle}
            autoFocus={isEditing}
            onChange={(e) => setNewTitle(e.target.value)}
            className={
              "[&:not(:focus)]:bg-(--background-secondary) [&:not(:focus)]:text-(--foreground-primary) focus:outline-0 focus:border-(--border-primary) focus:border border rounded border-(--border-primary) p-2 active:bg-(--background-secondary) focus:bg-(--background-secondary) active:text-(--foreground-primary) focus:text-(--foreground-primary)"
            }
          />
          <button
            className={"text-(--foreground-primary) cursor-pointer"}
            onClick={() => {
              setIsEditing(false);
              if (title !== newTitle) {
                updateTitle(newTitle);
              }
            }}
          >
            <IconCheck size={20} />
          </button>
        </h1>
      ) : (
        <h1 className={"text-xl font-bold text-(--foreground-primary)"}>
          <div
            className={"flex items-center gap-2 text-(--foreground-primary)"}
          >
            {dragProps && (
              <div className={"text-(--foreground-primary) cursor-pointer"} {...attributes} {...listeners}>
                <IconDragVertical size={20} />
              </div>
            )}
            <p className={"p-2"}>{title}</p>
            <button
              className={"text-(--foreground-primary) cursor-pointer"}
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <IconEdit size={20} />
            </button>
          </div>
        </h1>
      )}
    </div>
  );
}

export default ChangeableTitle;
