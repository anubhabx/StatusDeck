"use client";

import { useMonitorStore } from "@/store/monitor.store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const montiorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  url: z.string().url({ message: "Invalid URL format." }),
  interval: z.number().default(300),
  type: z.enum(["HTTP", "PING"]).default("HTTP")
});

const NewMonitorDialog = () => {
  const { addMonitor } = useMonitorStore();

  const form = useForm({
    resolver: zodResolver(montiorFormSchema),
    defaultValues: {
      name: "",
      url: "",
      interval: 300,
      type: "HTTP"
    }
  });

  const handleAddMonitor: SubmitHandler<z.infer<typeof montiorFormSchema>> = (
    data
  ) => {
    addMonitor(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">
          <PlusCircleIcon className="mr-1" />
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
                    <Select
                      onValueChange={(value) =>
                        field.onChange(parseInt(value, 10))
                      }
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-full border border-stone-900">
                        <SelectValue placeholder="Select check interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Every 5 minutes</SelectItem>
                        <SelectItem value="900">Every 15 minutes</SelectItem>
                        <SelectItem value="1800">Every 30 minutes</SelectItem>
                        <SelectItem value="3600">Every 1 hour</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <SelectItem value="PING">PING</SelectItem>
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
  );
};

export default NewMonitorDialog;
