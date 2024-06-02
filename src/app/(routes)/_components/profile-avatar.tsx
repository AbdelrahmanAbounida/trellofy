import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth/logout";

interface ProfileAvatarProps {
  image: string;
  name: string;
  email: string;
}

const ProfileAvatar = ({ image, name, email }: ProfileAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <Avatar className="bg-sky-100">
          <AvatarImage src={image} />
          <AvatarFallback className={cn(!image && "bg-sky-600 text-white")}>
            {name ? name?.slice(0, 2) : email?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[270px] mr-[220px] space-y-2">
        <DropdownMenuLabel className="pb-0">{name}</DropdownMenuLabel>
        <span className="text-slate-500 font-normal text-sm p-2">{email}</span>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex gap-2 font-medium my-1">
          <IoSettingsOutline />
          Settings
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer flex gap-2 font-medium my-1"
        >
          <AiOutlineLogout />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;