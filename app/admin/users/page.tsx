import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, UserIcon, Users } from "lucide-react";
import { RoleSelector } from "@/components/RoleSelector";

export default async function UsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Strict RBAC Guard
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage system permissions and user account levels.
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-1">
          Total Users: {users.length}
        </Badge>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="overflow-hidden bg-card/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* User Identity Section */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center border border-primary/10">
                    <UserIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{user.name}</h3>
                      {user.role === "ADMIN" && (
                        <Shield className="h-4 w-4 text-primary fill-primary/10" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {user.email}
                    </p>
                  </div>
                </div>

                {/* Status and Action Section */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                      Access Level
                    </span>
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                      className="text-[10px] font-bold"
                    >
                      {user.role}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                      Actions
                    </span>
                    <RoleSelector userId={user.id} currentRole={user.role} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
