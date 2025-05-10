"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatDistanceToNow } from "@/lib/utils";
import { Menu, Archive, Flag, Inbox, Clock, Trash, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarWithLogo } from "./avatar-with-logo";
import ComposeEmail from "./compose-email";
import type { EmailAccount, EmailFolder } from "../email";

interface SidebarProps {
  accounts: EmailAccount[];
  selectedFolder: EmailFolder;
  onSelectFolder: (folder: EmailFolder) => void;
  onToggleSidebar: () => void;
  onSendEmail: (email: { to: string; subject?: string; body?: string }) => void;
}

export default function Sidebar({
  accounts,
  selectedFolder,
  onSelectFolder,
  onToggleSidebar,
  onSendEmail,
}: SidebarProps) {
  const t = useTranslations("inbox.sidebar");
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div className="flex h-full w-64 flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-border/50 p-2">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("toggleSidebar")}</span>
        </Button>
        <div className="flex items-center gap-1">
          <h2 className="font-semibold">{t("title")}</h2>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2">

        <Button onClick={() => setIsComposeOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("compose")}
        </Button>

        <ScrollArea className="flex-1">
          <div className="space-y-4 py-2">
            {/* Unified folders */}
            <div className="space-y-1 px-1">
              <h3 className="ml-2 mb-1 text-xs font-semibold text-foreground/70">{t("mainFolders")}</h3>
              <Button
                variant={selectedFolder === "unified" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectFolder("unified")}
              >
                <Inbox className="mr-2 h-4 w-4" />
                {t("inbox")}
              </Button>
              <Button
                variant={selectedFolder === "unread" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectFolder("unread")}
              >
                <ChevronRight className="mr-2 h-4 w-4" />
                {t("unread")}
                <Badge variant="secondary" className="ml-auto">
                  12
                </Badge>
              </Button>
              <Button
                variant={selectedFolder === "flagged" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectFolder("flagged")}
              >
                <Flag className="mr-2 h-4 w-4" />
                {t("flagged")}
              </Button>
              <Button
                variant={selectedFolder === "snoozed" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectFolder("snoozed")}
              >
                <Clock className="mr-2 h-4 w-4" />
                {t("snoozed")}
              </Button>
              <Button
                variant={selectedFolder === "archived" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectFolder("archived")}
              >
                <Archive className="mr-2 h-4 w-4" />
                {t("archived")}
              </Button>
              <Button
                variant={selectedFolder === "trash" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectFolder("trash")}
              >
                <Trash className="mr-2 h-4 w-4" />
                {t("trash")}
              </Button>
            </div>

            {/* Accounts */}
            <div className="space-y-1 px-1">
              <h3 className="ml-2 mb-1 text-xs font-semibold text-foreground/70">{t("accounts")}</h3>
              {accounts.map((account) => (
                <Button
                  key={account.id}
                  variant={selectedFolder === account.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto"
                  onClick={() => onSelectFolder(account.id)}
                >
                  <AvatarWithLogo
                    sender={account}
                    className="mr-2"
                  />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-medium">{account.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {account.unread > 0 && `${account.unread} ${t("unreadEmails")}`}
                      {account.unread === 0 && t("updated", { time: formatDistanceToNow(account.lastUpdate) })}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      <ComposeEmail open={isComposeOpen} onClose={() => setIsComposeOpen(false)} onSend={onSendEmail} />
    </div>
  );
}
