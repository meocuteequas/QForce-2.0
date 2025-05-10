"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProjectClientForm() {
  const t = useTranslations("settings.project.tabs.client");
  const { toast } = useToast();

  const clientFormSchema = z.object({
    name: z.string().min(1, {
      message: t("form.nameError"),
    }),
    company: z.string().min(1, {
      message: t("form.companyError"),
    }),
    email: z.string().email({
      message: t("form.emailError"),
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
    notes: z.string().optional(),
  });
  type ClientFormValues = z.infer<typeof clientFormSchema>;

  // This would fetch client data in a real app
  const defaultValues: Partial<ClientFormValues> = {
    name: "Alex Johnson",
    company: "TechInnovate Inc.",
    email: "alex.johnson@techinnovate.com",
    phone: "(555) 123-4567",
    address: "123 Business Ave, Suite 500, San Francisco, CA 94107",
    notes: t("form.defaultNotes"),
  };

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  });

  function onSubmit(data: ClientFormValues) {
    // In a real app, you'd save this data to your backend
    console.log(data);
    toast({
      title: t("form.toastTitle"),
      description: t("form.toastDescription"),
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" alt={t("form.clientAvatarAlt")} />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-lg font-semibold">{form.getValues("name")}</h4>
          <p className="text-sm text-muted-foreground">{form.getValues("company")}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.contactName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.contactNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("form.contactNameDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.company")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.companyPlaceholder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("form.companyDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("form.emailPlaceholder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("form.emailDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.phonePlaceholder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("form.phoneDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.address")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.addressPlaceholder")} {...field} />
                </FormControl>
                <FormDescription>{t("form.addressDescription")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.notes")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("form.notesPlaceholder")} className="resize-none min-h-[100px]" {...field} />
                </FormControl>
                <FormDescription>{t("form.notesDescription")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("form.saveButton")}</Button>
        </form>
      </Form>
    </div>
  );
}
