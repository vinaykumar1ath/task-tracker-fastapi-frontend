export function extractMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Operation completed";
  }

  const obj = data as Record<string, unknown>;

  if (typeof obj.msg === "string") {
    return obj.msg;
  }

  if (typeof obj.message === "string") {
    return obj.message;
  }

  if (typeof obj.detail === "string") {
    return obj.detail;
  }

  return "Operation completed";
}

export function extractError(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (error as any).response;

    const data = response?.data;

    if (data?.msg) return data.msg;
    if (data?.message) return data.message;
    if (typeof data?.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data?.detail)) {
      return data.detail
        .map((item: any) => item.msg)
        .join(", ");
    }
  }

  return "Something went wrong";
}
