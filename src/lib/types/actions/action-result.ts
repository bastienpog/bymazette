export type ActionResult = Promise<
  { success: true; data?: any } | { success: false; error: string }
>;
