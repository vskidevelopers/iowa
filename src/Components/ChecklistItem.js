import React from "react";

export default function ChecklistItem({ icon, listItem, py }) {
  return (
    <div className={`flex items-center ${py}`}>
      <div className="mr-2">{icon}</div>
      <div className="text-sm capitalize">{listItem}</div>
    </div>
  );
}
