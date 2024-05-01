interface ResponseType<R> {
  statusCode: number;
  message: string | null;
  data: R;
}
interface HTTPInstance {
  get<R>(url: string, config?: RequestInit): Promise<ResponseType<R>>;
  delete<R>(url: string, config?: RequestInit): Promise<ResponseType<R>>;
  head<R>(url: string, config?: RequestInit): Promise<ResponseType<R>>;
  options<R>(url: string, config?: RequestInit): Promise<ResponseType<R>>;
  post<T, R>(
    url: string,
    body?: T,
    config?: RequestInit
  ): Promise<ResponseType<R>>;
  put<T, R>(
    url: string,
    body?: T,
    config?: RequestInit
  ): Promise<ResponseType<R>>;
  patch<T, R>(
    url: string,
    body?: T,
    config?: RequestInit
  ): Promise<ResponseType<R>>;
}

class Service {
  public http: HTTPInstance;

  private baseURL: string;

  private headers: Record<string, string>;

  constructor() {
    this.baseURL =
      process.env.NODE_ENV === "production"
        ? "https://beomjoon.site"
        : "http://localhost:8000";
    this.headers = {
      csrf: "token",
      Referer: this.baseURL,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };
  }

  private async refreshToken(retryFetch: () => Promise<ResponseType<any>>) {
    try {
      const refreshTokenResponse = await fetch(
        this.baseURL + "/auth/accessToken",
        {
          method: "POST",
          credentials: "include", // 쿠키에 있는 refresh token을 사용하도록 설정
        }
      );
      const responseData: ResponseType<null> =
        await refreshTokenResponse.json();
      console.log("responseData", responseData);
      if (responseData.statusCode === 200) {
        return retryFetch(); // 토큰 갱신 성공 후 요청 재시도
      } else {
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트 혹은 오류 처리
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }

  private async request<R, T = undefined>(
    method: string,
    url: string,
    config?: RequestInit,
    body?: T
  ): Promise<ResponseType<R>> {
    try {
      const headers = new Headers(this.headers);

      if (body && ["POST", "PUT", "PATCH"].includes(method)) {
        headers.set("Content-Type", "application/json");
      }

      const fetchConfig: RequestInit = {
        method: method,
        headers: headers,
        credentials: "include",
        ...config,
      };

      if (body && ["POST", "PUT", "PATCH"].includes(method)) {
        fetchConfig.body = JSON.stringify(body);
      }

      const response = await fetch(this.baseURL + url, fetchConfig);
      const responseData: ResponseType<R> = await response.json();

      const statusHandlers: {
        [statusCode: number]: () => Promise<ResponseType<R>>;
      } = {
        401: () =>
          this.refreshToken(() =>
            this.request<R, T>(method, url, config, body)
          ),
        403: () => {
          const res = {
            statusCode: 403,
            message: "세션이 만료되었습니다.",
          };
          throw new Error(JSON.stringify(res));
        },
        500: () => Promise.reject(new Error("Server error")),
      };

      if (statusHandlers[responseData.statusCode]) {
        return statusHandlers[responseData.statusCode]();
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  private get<R>(url: string, config?: RequestInit): Promise<ResponseType<R>> {
    return this.request<R>("GET", url, config);
  }

  private delete<R>(
    url: string,
    config?: RequestInit
  ): Promise<ResponseType<R>> {
    return this.request<R>("DELETE", url, config);
  }

  private head<R>(url: string, config?: RequestInit): Promise<ResponseType<R>> {
    return this.request<R>("HEAD", url, config);
  }

  private options<R>(
    url: string,
    config?: RequestInit
  ): Promise<ResponseType<R>> {
    return this.request<R>("OPTIONS", url, config);
  }

  private post<T, R>(
    url: string,
    body?: T,
    config?: RequestInit
  ): Promise<ResponseType<R>> {
    return this.request<R, T>("POST", url, config, body);
  }

  private put<T, R>(
    url: string,
    body?: T,
    config?: RequestInit
  ): Promise<ResponseType<R>> {
    return this.request<R, T>("PUT", url, config, body);
  }

  private patch<T, R>(
    url: string,
    body?: T,
    config?: RequestInit
  ): Promise<ResponseType<R>> {
    return this.request<R, T>("PATCH", url, config, body);
  }
}

export default Service;
