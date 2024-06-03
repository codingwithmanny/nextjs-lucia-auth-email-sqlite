"use client"

// Imports
// =================================
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/signin";

// Validations
// =================================
export const FormSchemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// Component
// =================================
export default function FormSignIn() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchemaSignIn>>({
    resolver: zodResolver(FormSchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchemaSignIn>) {
    const result = await signIn(data);
    if (result.error) {
      toast({
        variant: "destructive",
        description: result.error,
      })
    } else if (result.success) {
      toast({
        variant: "default",
        description: "Signed in successfully",
      })

      router.push("/");
    }
  }

  // Render
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" required placeholder="your@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" required placeholder="Your password" {...field} />
              </FormControl>
              <FormDescription>
                Your password must be at least 8 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
