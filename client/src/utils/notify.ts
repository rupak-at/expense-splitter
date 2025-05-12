import { toast } from "sonner";

export const notify = (userName: string, amount: number) => {
  const message = `
  <>
    <strong>${userName}</strong> added an expense of <strong>Rs. ${amount}</strong>
  </>
  `
  const duration = 5000
  toast(message, { duration });
};