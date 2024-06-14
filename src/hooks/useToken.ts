import { useTokenStore } from "@/stores/token";
import { useRouter } from "next/navigation";
import * as auth from "oauth4webapi";
import { useState } from "react";

export const useToken = () => {
  const router = useRouter();
  const issuerUrl = new URL(
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://hyperion.myecl.fr",
  );
  const client: auth.Client = {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
    token_endpoint_auth_method: "none",
  };
  async function getIssuer() {
    return auth
      .discoveryRequest(issuerUrl, { algorithm: "oauth2" })
      .then((response) => auth.processDiscoveryResponse(issuerUrl, response));
  }
  const { token, setToken, refreshToken, setRefreshToken } = useTokenStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function getToken() {
    const access_token_expires = token
      ? JSON.parse(atob(token.split(".")[1])).exp
      : 0;
    const now = Math.floor(Date.now() / 1000);
    if (access_token_expires - 60 > now) {
      return token;
    }
    console.log(isRefreshing, refreshToken)
    if (isRefreshing) {
      return;
    }
    if (!refreshToken) {
      setToken(null);
      router.replace("/login");
      return;
    }
    setIsRefreshing(true);
    const hyperionIssuer = await getIssuer();
    const response = await auth.refreshTokenGrantRequest(
      hyperionIssuer,
      client,
      refreshToken,
    );

    let challenges: auth.WWWAuthenticateChallenge[] | undefined;
    if ((challenges = auth.parseWwwAuthenticateChallenges(response))) {
      for (const challenge of challenges) {
        console.error("WWW-Authenticate Challenge", challenge);
      }
      setToken(null);
      setRefreshToken(null);
      router.replace("/login");
      setIsRefreshing(false);
      return;
    }

    const result = await auth.processRefreshTokenResponse(
      hyperionIssuer,
      client,
      response,
    );
    if (auth.isOAuth2Error(result)) {
      console.error("Error Response", result);
      setToken(null);
      setRefreshToken(null);
      router.replace("/login");
      setIsRefreshing(false);
      return;
    }

    console.log("Access Token Response", result);
    setToken(result.access_token);
    setRefreshToken(result.refresh_token ?? null);
    setIsRefreshing(false);
    return result.access_token;
  }

  return { getToken };
};
