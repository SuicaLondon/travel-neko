import React, { ReactNode } from "react";

type SidebarItemProps = {
  href: string;
  icon: ReactNode;
  children?: ReactNode;
  label?: ReactNode;
};

export default function SidebarItem({
  href,
  icon,
  children,
  label,
}: SidebarItemProps) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center space-x-2 rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {icon && <span className="text-xl">{icon}</span>}
        {children && <span className="text-xl">{children}</span>}
        {label && <span className="text-xl">{label}</span>}
      </a>
    </li>
  );
}
