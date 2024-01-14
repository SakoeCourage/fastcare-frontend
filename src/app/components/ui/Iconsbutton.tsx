import React, { ButtonHTMLAttributes } from "react";
import { Icon, IconProps } from "@iconify/react";
import classNames from "classnames";

interface IconifyIconProps extends ButtonHTMLAttributes<HTMLDivElement> {
    icon: string;
    fontSize?: string | number;
    fill?: string,
}

const IconifyIcon: React.FC<IconifyIconProps> = ({
    icon,
    fontSize = "1.375rem",
    onClick,
    className,
    fill,
    ...rest
}) => {
    return (
        <div onClick={onClick}
            className={`p-1 rounded-full h-8 w-8 aspect-square flex items-center justify-center bg-gray-50 ${className}`}
            {...rest}>
            <Icon fill={fill} icon={icon} fontSize={fontSize} />
        </div>
    );
};

export default IconifyIcon;
