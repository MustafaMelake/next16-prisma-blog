"use client";

import { updateUserRole } from "@/app/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface RoleSelectorProps {
  userId: string;
  currentRole: string; // Use 'string' here to keep the component flexible
}

export function RoleSelector({ userId, currentRole }: RoleSelectorProps) {
  const handleRoleChange = async (value: string) => {
    try {
      await updateUserRole(userId, value);
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
      console.error(error);
    }
  };

  return (
    <Select defaultValue={currentRole} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USER">User</SelectItem>
        <SelectItem value="AUTHOR">Author</SelectItem>
        <SelectItem value="ADMIN">Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}
