import React from "react";
import IconEye from "@/app/components/editing-panel/icons/icon-eye";
import IconEyeSlash from "@/app/components/editing-panel/icons/icon-eye-slash";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import IconTrashBin from "@/app/components/editing-panel/icons/icon-trash-bin";

interface EditableEntryProps {
  text: string;
  display: boolean;
  toggleVisibility: () => void;
  deleteEntry: () => void;
  toggleEdit: () => void;
}

function EditableEntry({
  text,
  toggleVisibility,
  display,
  deleteEntry,
  toggleEdit
}: EditableEntryProps) {
  return (
    <div
      className={
        "flex flex-col md:flex-row gap-2 justify-between text-(--foreground-primary) p-2"
      }
    >
      <p>{text}</p>
      <div
        className={
          "flex flex-row justify-between text-(--foreground-primary) gap-2"
        }
      >
        <button className={"cursor-pointer"} onClick={() => toggleVisibility()}>
          {display ? <IconEye size={20} /> : <IconEyeSlash size={20} />}
        </button>
        <button className={"cursor-pointer"} onClick={() => toggleEdit()}>
          <IconEdit size={20} />
        </button>
        <button className={"cursor-pointer"} onClick={() => deleteEntry()}>
          <IconTrashBin size={20} />
        </button>
      </div>
    </div>
  );
}

export default EditableEntry;
