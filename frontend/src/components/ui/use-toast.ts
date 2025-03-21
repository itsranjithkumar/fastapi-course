// src/components/ui/use-toast.ts
import { toast } from "sonner";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const showToast = (options: ToastOptions) => {
    if (options.variant === "destructive") {
      toast.error(options.title, {
        description: options.description,
      });
    } else {
      toast.success(options.title, {
        description: options.description,
      });
    }
  };

  return { toast: showToast };
};