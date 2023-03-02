type BaseApiResponse<RequestResponse> = { success: true; data: RequestResponse } | { success: false };

const BASE_API = process.env.BACKEND_API;

export abstract class ApiAbstractClass {
  protected async makeRequest<RequestResponse>(
    url: string,
    options?: Record<string, object | string>
  ): Promise<BaseApiResponse<RequestResponse>> {
    const result = await fetch(BASE_API + url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...(options || {}),
    });

    if (!result.ok) return { success: false };

    const response = await result.json();

    if (typeof response !== "object" || !response.success) return { success: false };

    return { success: true, data: response.data };
  }
}
