"use client";

import { useMonitorStore } from "@/store/monitor.store";
import React from "react";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@workspace/ui/components/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
} from "@workspace/ui/components/form";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";

const montiorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  url: z.string().url({ message: "Invalid URL format." }),
  interval: z.number().min(60).default(300),
  type: z.enum(["HTTP", "HTTPS", "PING"]).default("HTTP")
});

const EmptyMonitorState = () => {
  const { addMonitor } = useMonitorStore();

  const form = useForm({
    resolver: zodResolver(montiorFormSchema),
    defaultValues: {
      name: "",
      url: "",
      interval: 60,
      type: "HTTP"
    }
  });

  const handleAddMonitor: SubmitHandler<z.infer<typeof montiorFormSchema>> = (
    data
  ) => {
    addMonitor(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      No monitors available. Please add a monitor.
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">
            <PlusCircleIcon className="mr-2" />
            Add Monitor
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Monitor</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new monitor.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submit");
                form.handleSubmit(handleAddMonitor)();
              }}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Monitor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Monitor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Monitor URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interval"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Check Interval (seconds)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="300"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Monitor Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border border-stone-900">
                          <SelectValue placeholder="Select monitor type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HTTP">HTTP</SelectItem>
                        <SelectItem value="HTTPS">HTTPS</SelectItem>
                        <SelectItem value="PING">Ping</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button className="w-full" type="submit">
                    Add Monitor
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmptyMonitorState;
