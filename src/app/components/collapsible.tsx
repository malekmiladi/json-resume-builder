import React, { ReactNode } from "react";
import IconBarExpand from "@/app/components/editing-panel/icons/icon-bar-expand";
import IconBarCollapse from "@/app/components/editing-panel/icons/icon-bar-collapse";

function Collapsible({
  titleComponent,
  children
}: {
  titleComponent?: ReactNode;
  children?: ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  return (
    <div className={"flex flex-col gap-2"}>
      <div
        className={
          "text-lg font-semibold items-center flex flex-col md:flex-row justify-between gap-2 text-(--foreground-primary)"
        }
      >
        {titleComponent}
        <button
          className={"cursor-pointer"}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <IconBarExpand size={20} />
          ) : (
            <IconBarCollapse size={20} />
          )}
        </button>
      </div>
      {!isCollapsed && children}
    </div>
  );
}

export default Collapsible;
